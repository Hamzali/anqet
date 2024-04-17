import { Text, TextProps } from "react-native-ui-lib";

function ThemedText(props: TextProps) {
  const { style, ...rest } = props;
  return (
    <Text
      textColor
      {...rest}
      style={[style, { fontFamily: "SpaceMono" }]}
    ></Text>
  );
}

export default ThemedText;
