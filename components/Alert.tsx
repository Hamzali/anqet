import { Colors, Modifiers, Text, View } from "react-native-ui-lib";
const LEVEL_COLOR_MAP = {
  success: "green",
  error: "red",
  warning: "orange",
  info: "gray",
};
type AlertLevel = keyof typeof LEVEL_COLOR_MAP;
export default function Alert(
  props: { message: string; level: AlertLevel } & Partial<
    Record<Modifiers.TypographyLiterals | Modifiers.AlignmentLiterals, boolean>
  >
) {
  const { message, level, ...restProps } = props;
  const colorKey = LEVEL_COLOR_MAP[level];
  return (
    <View backgroundColor={Colors[`${colorKey}70`]} padding-10 br20 marginT-10>
      <Text text70 color={Colors[`${colorKey}10`]} {...restProps}>
        {message}
      </Text>
    </View>
  );
}
