import Alert from "@/components/Alert";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { supabase } from "@/supabase";
import { FontAwesome } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { FlatList } from "react-native";
import { Colors, TouchableOpacity, View } from "react-native-ui-lib";

type StatProps = {
  value: string;
  label: string;
};
function Stat(props: StatProps) {
  return (
    <View center>
      <ThemedText text20 primary>
        {props.value}
      </ThemedText>
      <ThemedText text50L>{props.label}</ThemedText>
    </View>
  );
}

function Divider() {
  return <View bg-grey50 width={1.5} height={"80%"}></View>;
}

function Report() {
  const { t } = useTranslation();

  const reportQuery = useQuery({
    queryKey: ["report"],
    queryFn: async () => {
      const [surveysResponse, templateResponse] = await Promise.all([
        supabase
          .from("surveys")
          .select()
          .eq("status", "COMPLETED")
          .throwOnError(),
        supabase.from("survey_templates").select().throwOnError(),
      ]);
      const surveys = surveysResponse.data ?? [];
      const templates = templateResponse.data ?? [];

      return surveys.map((s) => ({
        ...s,
        template_name: templates.find((t) => t.id === s.survey_template_id)
          ?.name,
      }));
    },
  });
  if (reportQuery.isLoading) {
    return (
      <ThemedView flex center>
        <ThemedText>{t("loading")}</ThemedText>
      </ThemedView>
    );
  }
  if (reportQuery.isError) {
    return (
      <ThemedView flex center>
        <Alert message={t("reportFailed")} level="error" />
      </ThemedView>
    );
  }

  const surveyReport = reportQuery.data;
  if (!surveyReport) {
    return (
      <ThemedView flex center>
        <Alert message={t("reportNotFound")} level="error" />
      </ThemedView>
    );
  }

  const stats = {
    total: surveyReport.length,
    score: 5,
    today: 5,
  };

  return (
    <ThemedView flex useSafeArea>
      <View gap-16 marginV-80>
        <ThemedText text50L center>
          {t("completedSurveys")}
        </ThemedText>

        <View row center gap-24>
          <Stat value={stats.score.toString()} label={t("reportScore")} />
          <Divider />
          <Stat value={stats.total.toString()} label={t("reportTotal")} />
          <Divider />
          <Stat value={stats.today.toString()} label={t("reportToday")} />
        </View>
      </View>

      <View row centerV gap-8 paddingH-36 marginB-8>
        <FontAwesome name="list" size={16} color={Colors.textColor} />
        <ThemedText>{t("list")}</ThemedText>
      </View>
      <FlatList
        style={{ flex: 1, paddingHorizontal: 36 }}
        refreshing={reportQuery.isFetching}
        onRefresh={() => {
          reportQuery.refetch();
        }}
        data={surveyReport}
        renderItem={(props) => {
          const date = format(props.item.created_at, "P");
          const time = format(props.item.created_at, "k:mm");
          return (
            <TouchableOpacity paddingH-16 paddingV-12 bg-grey60 marginB-8 br10>
              <ThemedText primary>{props.item.template_name}</ThemedText>
              <View row gap-8>
                <View row gap-4 center>
                  <FontAwesome
                    name="calendar"
                    size={16}
                    color={Colors.primary}
                  />
                  <ThemedText grey10>{date}</ThemedText>
                </View>
                <View row gap-4 center>
                  <FontAwesome
                    name="clock-o"
                    size={16}
                    color={Colors.primary}
                  />
                  <ThemedText grey10>{time}</ThemedText>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </ThemedView>
  );
}

export default Report;
