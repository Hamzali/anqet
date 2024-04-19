import { useColorScheme } from "react-native";
import {
  Colors,
  DateTimePicker,
  DateTimePickerProps,
} from "react-native-ui-lib";

function FormDateTimePicker(props: DateTimePickerProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <DateTimePicker
      text70BO
      grey10
      labelStyle={{
        color: isDark ? Colors.white : Colors.black,
        fontSize: 18,
        paddingBottom: 4,
        fontFamily: "SpaceMono",
      }}
      placeholderTextColor={Colors.grey50}
      style={{
        backgroundColor: Colors.white,
        padding: 12,
        height: 42,
        borderRadius: 8,
      }}
      {...props}
    />
  );
}

export default FormDateTimePicker;
