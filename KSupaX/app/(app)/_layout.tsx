import { Stack } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../hooks/useAuth";

const StackLayout = () => {
  const { signOut } = useAuth();

  return (
    <Stack>
      <Stack.Screen
        name="home/index"
        options={{
          headerTitle: "My Snapshots",
          headerRight: () => (
            <TouchableOpacity onPress={signOut}>
              <Ionicons name="log-out-outline" size={30} />
            </TouchableOpacity>
          ),
        }}
      ></Stack.Screen>
    </Stack>
  );
};

export default StackLayout;
