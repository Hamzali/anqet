import ThemedText from "@/components/ThemedText";
import { useColorScheme } from "react-native";
import { Colors, TextField, TextFieldProps, View } from "react-native-ui-lib";

function FormTextField(props: TextFieldProps & { helperText?: string }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { helperText, ...rest } = props;
  return (
    <View gap-4>
      <TextField
        text70BO
        grey10
        labelStyle={{
          color: isDark ? Colors.white : Colors.black,
          fontSize: 18,
          paddingBottom: 4,
          fontFamily: "SpaceMono",
        }}
        style={{
          backgroundColor: Colors.white,
          padding: 12,
          height: 42,
          borderRadius: 8,
        }}
        {...rest}
      />
      {helperText && <ThemedText text80BO>{helperText}</ThemedText>}
    </View>
  );
}

export default FormTextField;
