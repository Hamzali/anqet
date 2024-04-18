import GenderToggleButton from "@/components/GenderToggleButton";
import ThemedText from "@/components/ThemedText";
import { Link, router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, View } from "react-native-ui-lib";
import FormTextField from "../../components/FormTextField";

function SignUp() {
  const { t } = useTranslation();

  const [gender, setGender] = useState<string>("");

  return (
    <View gap-16 paddingH-64 paddingB-80 paddingT-20>
      <ThemedText text70>{t("genderInputLabel")}</ThemedText>
      <GenderToggleButton value={gender} onChange={setGender} />

      <View gap-8>
        <FormTextField label={t("email")} />
        <FormTextField
          label={t("nickname")}
          helperText={t("nicknameHelperText")}
        />
        <FormTextField secureTextEntry label={t("password")} />
        <FormTextField label={t("birthday")} />
      </View>

      <View gap-12>
        <Button
          fullWidth
          label={t("signup")}
          onPress={() => {
            router.replace("/auth/agreement");
          }}
        />
        <View row center>
          <ThemedText>{t("hasAccount")} </ThemedText>
          <Link href="/auth/signin">
            <ThemedText primary underline>
              {t("signin")}
            </ThemedText>
          </Link>
        </View>
      </View>
    </View>
  );
}

export default SignUp;
