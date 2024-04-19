import Alert from "@/components/Alert";
import ThemedText from "@/components/ThemedText";
import { supabase } from "@/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Button, Colors, View } from "react-native-ui-lib";
import AgreementSwitch from "./_components/AgreementSwitch";
import { useSignupFormContext } from "./_context/SignupFormContext";

function Agreement() {
  const { t } = useTranslation();

  const signupFormCtx = useSignupFormContext();

  const queryClient = useQueryClient();
  const signupMutation = useMutation({
    mutationFn: async () => {
      const response = await supabase.auth.signUp({
        email: signupFormCtx.state.email,
        password: signupFormCtx.state.password,
      });

      if (response.error) {
        throw response.error;
      }

      const { error } = await supabase.auth.updateUser({
        data: {
          nickname: signupFormCtx.state.nickname,
          gender: signupFormCtx.state.gender,
          birthdate: signupFormCtx.state.birthdate,
          privacyAgreed: signupFormCtx.state.privacyAgreed,
          termsAgreed: signupFormCtx.state.termsAgreed,
          marketingAgreed: signupFormCtx.state.marketingAgreed,
        },
      });

      if (response.error) {
        throw error;
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });

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
          value={signupFormCtx.state.termsAgreed}
          agreementText={t("termsDescription")}
          onValueChange={(value) =>
            signupFormCtx.dispatch({ type: "SET_TERMS_AGREED", payload: value })
          }
        />
        <AgreementSwitch
          value={signupFormCtx.state.privacyAgreed}
          agreementText={t("privacyDescription")}
          onValueChange={(value) =>
            signupFormCtx.dispatch({
              type: "SET_PRIVACY_AGREED",
              payload: value,
            })
          }
        />
        <AgreementSwitch
          value={signupFormCtx.state.marketingAgreed}
          agreementText={t("marketingDescription")}
          onValueChange={(value) =>
            signupFormCtx.dispatch({
              type: "SET_MARKETING_AGREED",
              payload: value,
            })
          }
        />
      </View>

      <View gap-8>
        <Button
          disabled={
            !signupFormCtx.state.termsAgreed ||
            !signupFormCtx.state.privacyAgreed ||
            signupMutation.isPending
          }
          fullWidth
          bg-primary
          white
          label={signupMutation.isPending ? t("signupLoading") : t("continue")}
          onPress={() => {
            signupMutation.mutate();
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

        <Alert message={t("signupFailed")} level="error" />
      </View>
    </View>
  );
}

export default Agreement;
