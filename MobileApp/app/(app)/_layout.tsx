import { Stack } from "expo-router";
import React from "react";
import { CreateBottomSheet, WebViewBottomSheet, DeleteBottomSheet } from "../../components";
import { View } from "react-native";

export default function StackLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
      </Stack>

      <CreateBottomSheet />
      <WebViewBottomSheet />
      <DeleteBottomSheet />
    </View>
  );
}
