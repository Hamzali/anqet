import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { AppState } from "react-native";
import { Database } from "./database.types";

// NOTE: left out as is in order to be able tor run it locally on baykar's end.
const supabaseUrl = "https://zxzenxbyxvmmjndkuzvb.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4emVueGJ5eHZtbWpuZGt1enZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1MTMyMzIsImV4cCI6MjAyOTA4OTIzMn0._dHSVz5sZR30b4YYbrUEwc_K6m8l14tAA2F_Hf3714k";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export function useCurrentUserQuery() {
  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await supabase.auth.getUser();
      if (response.error) {
        throw response.error;
      }

      if (!response.data.user) {
        throw new Error("User not found");
      }

      return response.data.user;
    },
  });

  return query;
}
