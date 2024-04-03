import { Stack } from "expo-router";
import React from "react";
import { useAuth, useBottomSheet } from "../../hooks";
import { CreateBottomSheet, WebViewBottomSheet, DeleteBottomSheet } from "../../components";
import { View } from "react-native";

export default function StackLayout() {
  const { signOut } = useAuth();
  const { openCreateBS } = useBottomSheet();

  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            // headerLeft: () => <IconButton iconName="log-out" onPressed={signOut} />,
            // headerRight: () => <IconButton iconName="add-to-list" onPressed={openCreateBS} />,
          }}
        ></Stack.Screen>
      </Stack>

      <CreateBottomSheet />
      <WebViewBottomSheet />
      <DeleteBottomSheet />
    </View>
  );
}
