import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth, useBottomSheet } from "../../hooks";
import { CONSTANTS } from "../../utils";

export default function StackLayout() {
  const { signOut } = useAuth();
  const { openCreateBS } = useBottomSheet();
  // const { uploadSnapshot } = useImagePicker();

  return (
    <Stack>
      <Stack.Screen
        name="home/index"
        options={{
          headerTitle: CONSTANTS.appName,
          headerTitleAlign: "center",
          headerLeft: () => (
            <TouchableOpacity onPress={signOut}>
              <Ionicons name="log-out-outline" size={30} style={styles.logOutButton} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={openCreateBS}>
              <Ionicons name="add-outline" size={30} />
            </TouchableOpacity>
          ),
        }}
      ></Stack.Screen>
    </Stack>
  );
}

const styles = StyleSheet.create({
  logOutButton: {
    transform: [{ scaleX: -1 }],
  },
});
