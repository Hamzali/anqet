import ThemedText from "@/components/ThemedText";
import { Link, router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Text, TouchableOpacity, View } from "react-native-ui-lib";
import AuthTextField from "./_components/AuthTextFiled";

type ToggleButtonOption<T> = {
  value: T;
  label: string;
};

type ToggleButtonProps<T> = {
  value: T;
  onChange: (value: T) => void;
  options: ToggleButtonOption<T>[];
};

function ToggleButton<T>(props: ToggleButtonProps<T>) {
  return (
    <View row spread>
      {props.options.map((option, key) => {
        const selected = props.value === option.value;
        return (
          <TouchableOpacity
            paddingV-16
            paddingH-32
            br10
            bg-primary={selected}
            bg-white={!selected}
            key={`${option.value}-${key}`}
            onPress={() => {
              props.onChange(option.value);
            }}
          >
            <Text text50L white={selected}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function SignUp() {
  const { t } = useTranslation();
  const genderOptions: ToggleButtonOption<string>[] = [
    {
      value: "male",
      label: t("male"),
    },
    {
      value: "female",
      label: t("female"),
    },
  ];

  const [gender, setGender] = useState<string>("");

  return (
    <View gap-16 paddingH-64 paddingB-80 paddingT-20>
      <ThemedText text70>{t("genderInputLabel")}</ThemedText>
      <ToggleButton
        value={gender}
        options={genderOptions}
        onChange={setGender}
      />

      <View gap-8>
        <AuthTextField label={t("email")} />
        <AuthTextField
          label={t("nickname")}
          helperText={t("nicknameHelperText")}
        />
        <AuthTextField secureTextEntry label={t("password")} />
        <AuthTextField label={t("birthday")} />
      </View>

      <View gap-12>
        <Button
          fullWidth
          bg-primary
          white
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
