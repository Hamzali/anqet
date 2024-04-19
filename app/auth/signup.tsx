import FormDateTimePicker from "@/components/FormDateTimePicker";
import GenderToggleButton from "@/components/GenderToggleButton";
import ThemedText from "@/components/ThemedText";
import useFormValidity from "@/hooks/useFormValidity";
import { Link, router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Button, View } from "react-native-ui-lib";
import FormTextField from "../../components/FormTextField";
import { useSignupFormContext } from "./_context/SignupFormContext";

function SignUp() {
  const { t } = useTranslation();

  const signupFormCtx = useSignupFormContext();

  const [formValid, setFieldByValidity] = useFormValidity({
    email: false,
    nickname: false,
    password: false,
    birthdate: false,
    gender: false,
  });

  return (
    <View gap-16 paddingH-64 paddingB-80 paddingT-20>
      <ThemedText text70>{t("genderInputLabel")}</ThemedText>
      <GenderToggleButton
        value={signupFormCtx.state.gender}
        onChange={(gender) => {
          setFieldByValidity("gender", true);
          signupFormCtx.dispatch({ type: "SET_GENDER", payload: gender });
        }}
      />

      <View gap-8>
        <FormTextField
          value={signupFormCtx.state.email}
          onChangeText={(email) =>
            signupFormCtx.dispatch({
              type: "SET_EMAIL",
              payload: email,
            })
          }
          label={t("email")}
          textContentType="emailAddress"
          inputMode="email"
          validate={["required", "email"]}
          validationMessage={[t("emailRequired"), t("emailInvalid")]}
          enableErrors
          validateOnBlur
          onChangeValidity={(valid) => setFieldByValidity("email", valid)}
        />
        <FormTextField
          value={signupFormCtx.state.nickname}
          onChangeText={(nickname) =>
            signupFormCtx.dispatch({
              type: "SET_NICKNAME",
              payload: nickname,
            })
          }
          label={t("nickname")}
          helperText={t("nicknameHelperText")}
          enableErrors
          validate={["required"]}
          validationMessage={[t("nicknameRequired")]}
          validateOnBlur
          onChangeValidity={(valid) => setFieldByValidity("nickname", valid)}
        />
        <FormTextField
          value={signupFormCtx.state.password}
          onChangeText={(password) =>
            signupFormCtx.dispatch({
              type: "SET_PASSWORD",
              payload: password,
            })
          }
          secureTextEntry
          textContentType="password"
          inputMode="text"
          label={t("password")}
          validate={["required", (v: string) => v.length >= 6]}
          validationMessage={[t("passwordRequired"), t("passwordMinLength")]}
          enableErrors
          validateOnBlur
          onChangeValidity={(valid) => setFieldByValidity("password", valid)}
        />
        <FormDateTimePicker
          value={signupFormCtx.state.birthdate}
          onChange={(birthdate) => {
            setFieldByValidity("birthdate", true);
            signupFormCtx.dispatch({
              type: "SET_BIRTHDATE",
              payload: birthdate,
            });
          }}
          label={t("birthdate")}
          placeholder={t("dd/mm/yyyy")}
        />
      </View>

      <View gap-12>
        <Button
          disabled={!formValid}
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
