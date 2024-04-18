import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Colors } from "react-native-ui-lib";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="report"
        options={{
          title: t("report"),
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="line-chart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: t("home"),
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t("profile"),
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
