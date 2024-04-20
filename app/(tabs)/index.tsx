import Alert from "@/components/Alert";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { supabase, useCurrentUserQuery } from "@/supabase";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { useWindowDimensions } from "react-native";
import { Button, Image, View } from "react-native-ui-lib";

export default function TabOneScreen() {
  const { t } = useTranslation();
  const dim = useWindowDimensions();

  const currentUserQuery = useCurrentUserQuery();

  const surveyTemplateQuery = useQuery({
    queryKey: ["surveyTemplate"],
    queryFn: async () => {
      const { data } = await supabase
        .from("survey_templates")
        .select("id")
        .throwOnError()
        .single();

      if (data === null) {
        throw new Error("No survey template found");
      }
      return data;
    },
  });

  const activeSurveyQuery = useQuery({
    queryKey: ["activeSurvey"],
    queryFn: async () => {
      const { data } = await supabase
        .from("surveys")
        .select()
        .eq("status", "IN_PROGRESS")
        .eq("user_id", currentUserQuery.data?.id ?? "")
        .maybeSingle()
        .throwOnError();

      return data;
    },
  });

  const startSurveyMutation = useMutation({
    mutationFn: async () => {
      const { data } = await supabase
        .from("surveys")
        .insert({
          user_id: currentUserQuery.data?.id ?? "",
          survey_template_id: surveyTemplateQuery.data?.id ?? "",
        })
        .select("id")
        .single()
        .throwOnError();

      if (data === null) {
        throw new Error("Failed to create survey");
      }

      router.push({
        pathname: "/survey",
        params: {
          surveyId: data.id,
        },
      });
    },
    onSuccess: () => {
      activeSurveyQuery.refetch();
    },
  });

  const loading =
    surveyTemplateQuery.isLoading ||
    currentUserQuery.isLoading ||
    activeSurveyQuery.isLoading;

  if (loading) {
    return (
      <ThemedView flex center>
        <ThemedText>{t("loading")}</ThemedText>
      </ThemedView>
    );
  }

  const error =
    surveyTemplateQuery.isError ||
    currentUserQuery.isError ||
    activeSurveyQuery.isError;
  if (error) {
    console.log(
      "error: ",
      surveyTemplateQuery.error,
      currentUserQuery.error,
      activeSurveyQuery.error
    );
    return (
      <ThemedView flex center>
        <Alert message={t("homeLoadFailed")} level="error" />
      </ThemedView>
    );
  }

  const currentUser = currentUserQuery.data;
  const surveyTemplate = surveyTemplateQuery.data;
  if (!surveyTemplate || !currentUser) {
    return (
      <ThemedView flex center>
        <Alert message={t("homeEmptyData")} level="error" />
      </ThemedView>
    );
  }

  const activeSurvey = activeSurveyQuery.data;
  const nickname = currentUser.user_metadata.nickname || t("noNickname");

  return (
    <ThemedView flex style={{ flexDirection: "column-reverse" }}>
      <View absF>
        <Image
          assetName="signinBg"
          assetGroup="images"
          width={dim.width}
          height={dim.height}
        />
      </View>
      <ThemedView
        paddingV-120
        paddingH-40
        gap-36
        style={{
          borderTopEndRadius: 32,
          borderTopStartRadius: 32,
        }}
      >
        <ThemedText text60 center>
          {t("welcome")}, <ThemedText primary>{nickname}</ThemedText>
        </ThemedText>
        <View row center>
          {!activeSurvey && (
            <Button
              text50L
              label={t("startSurvey")}
              onPress={() => {
                startSurveyMutation.mutate();
              }}
            />
          )}
          {activeSurvey && (
            <Button
              text50L
              label={t("continueSurvey")}
              onPress={() => {
                router.push({
                  pathname: "/survey",
                  params: {
                    surveyId: activeSurvey.id,
                  },
                });
              }}
            />
          )}
        </View>
      </ThemedView>
    </ThemedView>
  );
}
