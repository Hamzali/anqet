import ThemedText from "@/components/ThemedText";
import ThemedView from "@/components/ThemedView";
import { useTranslation } from "react-i18next";
import { useWindowDimensions } from "react-native";
import { Button, Image, View } from "react-native-ui-lib";

export default function TabOneScreen() {
  const { t } = useTranslation();
  const dim = useWindowDimensions();

  const nickname = "John Doe";
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
      <ThemedView paddingV-120 paddingH-40 gap-36>
        <ThemedText text60 center>
          {t("welcome")}, <ThemedText primary>{nickname}</ThemedText>
        </ThemedText>
        <View row center>
          <Button text50L label={t("startSurvey")} />
        </View>
      </ThemedView>
    </ThemedView>
  );
}
