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

import { Colors, SchemeType } from "react-native-ui-lib";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

Colors.loadSchemes({
  light: {
    screenBG: "transparent",
    textColor: Colors.grey10,
    moonOrSun: Colors.yellow30,
    mountainForeground: Colors.green30,
    mountainBackground: Colors.green50,
    $backgroundSuccess: Colors.green40,
    $backgroundSuccessLight: Colors.green70,
  },
  dark: {
    screenBG: Colors.grey10,
    textColor: Colors.white,
    moonOrSun: Colors.grey80,
    mountainForeground: Colors.violet10,
    mountainBackground: Colors.violet20,
    $backgroundSuccess: Colors.green40,
    $backgroundSuccessLight: Colors.green20,
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
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
