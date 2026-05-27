import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#0A0508",
          borderTopColor: "#3A0D18",
          height: 70,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: "#D4AF37",
        tabBarInactiveTintColor: "#8C6A73",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Shows",
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Bookings",
        }}
      />
    </Tabs>
  );
}