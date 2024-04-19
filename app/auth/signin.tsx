import ThemedText from "@/components/ThemedText";
import { supabase } from "@/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, View } from "react-native-ui-lib";
import FormTextField from "../../components/FormTextField";
import Alert from "@/components/Alert";

function Signin() {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const queryClient = useQueryClient();
  const signinMutation = useMutation({
    mutationFn: async () => {
      const response = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (response.error) {
        throw response.error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });

  const [formValid, setFormValid] = useState(false);

  return (
    <View gap-80 paddingV-80 paddingH-64>
      <ThemedText center text40>
        {t("welcome")}
      </ThemedText>
      <View gap-8>
        <FormTextField
          value={email}
          onChangeText={setEmail}
          label={t("email")}
          inputMode="email"
          textContentType="emailAddress"
          enableErrors
          validate={["required", "email"]}
          validationMessage={[t("emailRequired"), t("emailInvalid")]}
          onChangeValidity={setFormValid}
          validateOnBlur
        />
        <FormTextField
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          textContentType="password"
          label={t("password")}
        />
      </View>
      <View gap-12>
        <Button
          disabled={!formValid || signinMutation.isPending}
          fullWidth
          label={signinMutation.isPending ? t("signinLoading") : t("signin")}
          onPress={() => {
            if (formValid) {
              signinMutation.mutate();
            }
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
        {signinMutation.isError && <Alert message={t('signinFailed')} level="error"/>}
      </View>
    </View>
  );
}

export default Signin;
