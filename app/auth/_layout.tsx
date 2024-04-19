import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import { Colors, Image, View } from "react-native-ui-lib";
import { SignupFormProvider } from "./_context/SignupFormContext";

function useKeyboardVisible(
  params: { onKeyShow?: () => void; onKeyHide?: () => void } = {}
) {
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const { onKeyShow, onKeyHide } = params;
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      onKeyShow && onKeyShow();
      setKeyboardStatus(true);
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      onKeyHide && onKeyHide();

      setKeyboardStatus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [onKeyShow, onKeyHide]);

  return keyboardStatus;
}

function AuthLayout() {
  const dim = useWindowDimensions();
  // in order force to re-render when the color scheme changes
  const _colorScheme = useColorScheme();

  const isKeyboardVisible = useKeyboardVisible();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View flex>
          <View absF>
            <Image
              assetName="signinBg"
              assetGroup="images"
              width={dim.width}
              height={dim.height}
            />
          </View>
          <View
            style={{
              flex: isKeyboardVisible ? 0 : 1,
            }}
          />

          <View
            backgroundColor={Colors.authBG}
            style={{
              borderTopEndRadius: 32,
              borderTopStartRadius: 32,
            }}
          >
            <SignupFormProvider>
              <Slot />
            </SignupFormProvider>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default AuthLayout;
