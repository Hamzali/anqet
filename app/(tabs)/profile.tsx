import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Button } from "react-native-ui-lib";

export default function TabTwoScreen() {
  const { t } = useTranslation();
  return (
    <ThemedView flex center>
      <ThemedText text70BO>{t("title")}</ThemedText>
      <Button
        label={t("logout")}
        onPress={() => {
          router.replace("/auth/signin");
        }}
      />
    </ThemedView>
  );
}
