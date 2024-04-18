import { Slot } from "expo-router";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import { Colors, Image, View } from "react-native-ui-lib";

function AuthLayout() {
  const dim = useWindowDimensions();
  // in order force to re-render when the color scheme changes
  const _colorScheme = useColorScheme();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View flex style={{ flexDirection: "column-reverse" }}>
        <View absF>
          <Image
            assetName="signinBg"
            assetGroup="images"
            width={dim.width}
            height={dim.height}
          />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            backgroundColor={Colors.authBG}
            style={{
              borderTopEndRadius: 32,
              borderTopStartRadius: 32,
            }}
          >
            <Slot />
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default AuthLayout;
