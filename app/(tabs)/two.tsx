import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { useTranslation } from "react-i18next";

export default function TabTwoScreen() {
  const { t } = useTranslation();
  return (
    <ThemedView flex center>
      <ThemedText text70BO>{t("title")}</ThemedText>
    </ThemedView>
  );
}
