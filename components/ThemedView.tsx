import { View, ViewProps } from "react-native-ui-lib";

function ThemedView(props: ViewProps) {
  return <View bg-screenBG {...props}></View>;
}

export default ThemedView;
