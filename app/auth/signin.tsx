import ThemedText from "@/components/ThemedText";
import { Link, router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Button, View } from "react-native-ui-lib";
import AuthTextField from "./_components/AuthTextFiled";

function Signin() {
  const { t } = useTranslation();
  return (
    <View gap-80 paddingV-80 paddingH-64>
      <ThemedText center text40>
        {t("welcome")}
      </ThemedText>
      <View gap-8>
        <AuthTextField
          label={t("nickname")}
          helperText={t("nicknameHelperText")}
        />
        <AuthTextField secureTextEntry label={t("password")} />
      </View>
      <View gap-12>
        <Button
          fullWidth
          label={t("signin")}
          bg-primary
          white
          onPress={() => {
            router.replace("/");
          }}
        />
        <View row center>
          <ThemedText>{t("noAccount")} </ThemedText>
          <Link href="/auth/signup">
            <ThemedText primary underline>
              {t("signup")}
            </ThemedText>
          </Link>
        </View>
      </View>
    </View>
  );
}

export default Signin;
