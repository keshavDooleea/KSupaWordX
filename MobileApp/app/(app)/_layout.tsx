import { Stack } from "expo-router";
import React from "react";
import { useAuth, useBottomSheet } from "../../hooks";
import { HeaderSearchBar, IconButton } from "../../components";

export default function StackLayout() {
  const { signOut } = useAuth();
  const { openCreateBS } = useBottomSheet();

  return (
    <Stack>
      <Stack.Screen
        name="home/index"
        options={{
          headerTitle: () => <HeaderSearchBar />,
          headerTitleAlign: "center",
          headerLeft: () => <IconButton iconName="add-to-list" onPressed={openCreateBS} />,
          headerRight: () => <IconButton iconName="log-out" onPressed={signOut} />,
        }}
      ></Stack.Screen>
    </Stack>
  );
}
