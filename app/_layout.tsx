import { setupI18n } from "@/translations";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

import { Assets, Colors, SchemeType } from "react-native-ui-lib";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

Assets.loadAssetsGroup("images", {
  signinBg: require("../assets/images/signin-bg.png"),
});
setupI18n();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
Colors.loadColors({
  primary: "#0300A3",
});
Colors.loadSchemes({
  light: {
    screenBG: Colors.rgba(Colors.white, 0.5) ?? "transparent",
    authBG: Colors.rgba(Colors.white, 0.8) ?? "transparent",
    textColor: Colors.grey10,
    $backgroundPrimaryHeavy: Colors.getColorTint(Colors.primary, 1),
    $backgroundPrimaryMedium: Colors.getColorTint(Colors.primary, 10),
    $backgroundPrimaryLight: Colors.getColorTint(Colors.primary, 30),
    $textDefaultLight: Colors.white,
    primary: Colors.primary,
  },
  dark: {
    screenBG: Colors.rgba(Colors.black, 0.5) ?? "transparent",
    authBG: Colors.rgba(Colors.black, 0.8) ?? "transparent",
    textColor: Colors.white,
    primary: Colors.getColorTint(Colors.primary, 30),
    $backgroundPrimaryHeavy: Colors.getColorTint(Colors.primary, 30),
    $backgroundPrimaryMedium: Colors.getColorTint(Colors.primary, 40),
    $backgroundPrimaryLight: Colors.getColorTint(Colors.primary, 50),
    $textDefaultLight: Colors.white,
  },
});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    Colors.setScheme(colorScheme as SchemeType);
  }, [colorScheme]);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
