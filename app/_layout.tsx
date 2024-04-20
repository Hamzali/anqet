import { supabase } from "@/supabase";
import { setupI18n } from "@/translations";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

import { Assets, Colors, SchemeType } from "react-native-ui-lib";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

Assets.loadAssetsGroup("images", {
  signinBg: require("../assets/images/signin-bg.png"),
  surveyCompleted: require("../assets/images/survey-completed.png"),
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

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppLoader />
    </QueryClientProvider>
  );
}

function AppLoader() {
  const colorScheme = useColorScheme();
  useEffect(() => {
    Colors.setScheme(colorScheme as SchemeType);
  }, [colorScheme]);

  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  const [initialRoute, setInitialRoute] = useState("");
  const sessionQuery = useQuery({
    queryKey: ["session"],
    queryFn: async () => {
      await supabase.auth.initialize();
      return supabase.auth.getSession().then((res) => {
        if (res.error) {
          throw res.error;
        }
        return res.data.session;
      });
    },
  });

  const isUserLoaded = sessionQuery.isSuccess;
  const session = sessionQuery.data;
  const isAnonym = session?.user?.is_anonymous ?? true;

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && isUserLoaded) {
      setInitialRoute(isAnonym ? "auth" : "(tabs)");
    }
  }, [loaded, isUserLoaded, isAnonym]);

  if (initialRoute === "") {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <RootLayoutNav initialRoute={initialRoute} />
    </ThemeProvider>
  );
}

function RootLayoutNav(props: { initialRoute: string }) {
  useEffect(() => {
    if (props.initialRoute === "auth") {
      router.replace("/auth/signin");
    } else {
      router.replace("/(tabs)");
    }

    if (props.initialRoute !== "") {
      SplashScreen.hideAsync();
    }
  }, [props.initialRoute]);

  return (
    <Stack>
      <Stack.Screen name="auth" options={{ headerShown: false }} />
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, statusBarTranslucent: false }}
      />
      <Stack.Screen
        name="survey"
        options={{
          headerBackTitle: "home",
          headerTitle: "",
        }}
      />
    </Stack>
  );
}
