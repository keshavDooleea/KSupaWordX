import { Stack } from "expo-router";
import React from "react";
import { useAuth, useBottomSheet } from "../../hooks";
import { CreateBottomSheet, HeaderSearchBar, IconButton, WebViewBottomSheet, DeleteBottomSheet } from "../../components";
import { View } from "react-native";

export default function StackLayout() {
  const { signOut } = useAuth();
  const { openCreateBS } = useBottomSheet();

  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="home/index"
          options={{
            gestureEnabled: false,
            headerTitle: () => <HeaderSearchBar />,
            headerTitleAlign: "center",
            headerLeft: () => <IconButton iconName="log-out" onPressed={signOut} />,
            headerRight: () => <IconButton iconName="add-to-list" onPressed={openCreateBS} />,
          }}
        ></Stack.Screen>
      </Stack>

      <CreateBottomSheet />
      <WebViewBottomSheet />
      <DeleteBottomSheet />
    </View>
  );
}
