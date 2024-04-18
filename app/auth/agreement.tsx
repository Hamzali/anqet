import ThemedText from "@/components/ThemedText";
import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Colors, View } from "react-native-ui-lib";
import AgreementSwitch from "./_components/AgreementSwitch";

function Agreement() {
  const { t } = useTranslation();

  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [marketing, setMarketing] = useState(false);

  return (
    <View gap-24 paddingB-80 paddingT-48 paddingH-36>
      <View gap-8>
        <ThemedText center text50L>
          {t("agreementsTitle")}
        </ThemedText>
        <ThemedText center>{t("agreementsDescription")}</ThemedText>
      </View>
      <View gap-24>
        <AgreementSwitch
          value={terms}
          agreementText={t("termsDescription")}
          onValueChange={setTerms}
        />
        <AgreementSwitch
          value={privacy}
          agreementText={t("privacyDescription")}
          onValueChange={setPrivacy}
        />
        <AgreementSwitch
          value={marketing}
          agreementText={t("marketingDescription")}
          onValueChange={setMarketing}
        />
      </View>

      <View gap-8>
        <Button
          disabled={!terms || !privacy}
          fullWidth
          bg-primary
          white
          label={t("continue")}
          onPress={() => {
            router.replace("/");
          }}
        />
        <Button
          fullWidth
          link
          linkColor={Colors.primary}
          label={t("back")}
          onPress={() => {
            router.replace("/auth/signup");
          }}
        />
      </View>
    </View>
  );
}

export default Agreement;
