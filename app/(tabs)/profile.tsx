import FormDateTimePicker from "@/components/FormDateTimePicker";
import FormTextField from "@/components/FormTextField";
import GenderToggleButton from "@/components/GenderToggleButton";
import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
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
  const profileData = {
    nickname: "jhondoe",
    email: "jhone@email.com",
    birthdate: "2024-01-02",
    gender: "male",
  };

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
              onPress={() => {
                router.replace("/auth/signin");
              }}
            >
              <ThemedText text70 white marginR-8>
                {t("signout")}
              </ThemedText>
              <FontAwesome name="sign-out" size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <GenderToggleButton
            value={profileData.gender}
            onChange={console.log}
          />

          <View gap-8>
            <FormTextField value={profileData.nickname} label={t("nickname")} />
            <FormTextField value={profileData.email} label={t("email")} />
            <FormDateTimePicker
              label={t("birthday")}
              placeholder={t("dd/mm/yyyy")}
              value={new Date(profileData.birthdate)}
            />
          </View>

          <Button
            fullWidth
            label={t("save")}
            onPress={() => {
              console.log("saved");
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
