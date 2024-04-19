import Alert from "@/components/Alert";
import FormDateTimePicker from "@/components/FormDateTimePicker";
import FormTextField from "@/components/FormTextField";
import GenderToggleButton from "@/components/GenderToggleButton";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import useFormValidity from "@/hooks/useFormValidity";
import { useStateWithInit } from "@/hooks/useStateWithInit";
import { supabase } from "@/supabase";
import { FontAwesome } from "@expo/vector-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import {
  Button,
  Colors,
  ExpandableSection,
  TouchableOpacity,
  View,
} from "react-native-ui-lib";

type AboutUsSectionProps = {
  title: string;
  description: string;
};

function AboutUsSection(props: AboutUsSectionProps) {
  const [open, setOpen] = useState(false);

  return (
    <ExpandableSection
      expanded={open}
      onPress={() => setOpen(!open)}
      sectionHeader={
        <View padding-16 bg-grey50 br10>
          <ThemedText primary>{props.title}</ThemedText>
        </View>
      }
    >
      <ThemedText>{props.description}</ThemedText>
    </ExpandableSection>
  );
}

export default function TabTwoScreen() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await supabase.auth.getUser();
      if (response.error) {
        throw response.error;
      }

      if (!response.data.user) {
        throw new Error("User not found");
      }

      return response.data.user;
    },
  });

  const profileData = profileQuery.data?.user_metadata ?? {};

  const [gender, setGender] = useStateWithInit(profileData.gender);
  const [email, setEmail] = useStateWithInit(profileData.email);
  const [nickname, setNickname] = useStateWithInit(profileData.nickname);
  const [birthdate, setBirthdate] = useStateWithInit(profileData.birthdate);

  const profileMutation = useMutation({
    mutationFn: async () => {
      const response = await supabase.auth.updateUser({
        data: {
          email,
          gender,
          nickname,
          birthdate,
        },
      });
      if (response.error) {
        throw response.error;
      }
    },
    onSettled: () => {
      profileQuery.refetch();
    },
  });

  const hasNoChanges =
    email === profileData.email &&
    nickname === profileData.nickname &&
    gender === profileData.gender &&
    birthdate === profileData.birthdate;

  const [formValid, setFieldByValidity] = useFormValidity({
    email: true,
    nickname: true,
  });

  if (profileQuery.isError) {
    return (
      <ThemedView flex center>
        <Alert message={t("profileLoadFailed")} level="error" />
      </ThemedView>
    );
  }

  if (profileQuery.isLoading) {
    return (
      <ThemedView flex center>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <ThemedView flex useSafeArea>
        <View paddingH-36 gap-16>
          <View row spread centerV>
            <ThemedText text50BO>{t("profile")}</ThemedText>
            <TouchableOpacity
              row
              center
              paddingH-8
              paddingV-4
              bg-$backgroundDangerHeavy
              br20
              onPress={async () => {
                await supabase.auth.signOut();
                queryClient.invalidateQueries({ queryKey: ["session"] });
              }}
            >
              <ThemedText text70 white marginR-8>
                {t("signout")}
              </ThemedText>
              <FontAwesome name="sign-out" size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <GenderToggleButton value={gender} onChange={setGender} />

          <View gap-8>
            <FormTextField
              value={nickname}
              onChangeText={setNickname}
              label={t("nickname")}
              helperText={t("nicknameHelperText")}
              enableErrors
              validate={["required"]}
              validationMessage={[t("nicknameRequired")]}
              validateOnBlur
              onChangeValidity={(valid) =>
                setFieldByValidity("nickname", valid)
              }
            />
            <FormTextField
              value={email}
              onChangeText={setEmail}
              label={t("email")}
              textContentType="emailAddress"
              inputMode="email"
              validate={["required", "email"]}
              validationMessage={[t("emailRequired"), t("emailInvalid")]}
              enableErrors
              validateOnBlur
              onChangeValidity={(valid) => setFieldByValidity("email", valid)}
            />
            <FormDateTimePicker
              label={t("birthdate")}
              placeholder={t("dd/mm/yyyy")}
              value={new Date(birthdate)}
              onChange={setBirthdate}
            />
          </View>

          <Button
            disabled={!formValid || hasNoChanges || profileMutation.isPending}
            fullWidth
            label={profileMutation.isPending ? t("saveLoading") : t("save")}
            onPress={() => {
              profileMutation.mutate();
            }}
          />

          <ThemedText text50BO>{t("aboutUs")}</ThemedText>
          <View gap-8>
            <AboutUsSection
              title={t("termsTitle")}
              description={t("termsDescription")}
            />
            <AboutUsSection
              title={t("privacyTitle")}
              description={t("privacyDescription")}
            />
          </View>
        </View>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}
