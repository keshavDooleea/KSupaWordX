import React from "react";
import { AppState, StyleSheet, View } from "react-native";
import { CONSTANTS, globalStyles, supabase } from "../../utils";
import { AuthBottomSheet } from "../../components/bottom_sheets";
import { Text } from "react-native-elements";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  return (
    <View style={[globalStyles.flex, styles.container]}>
      <Text>{CONSTANTS.appName}</Text>
      <AuthBottomSheet />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: "50%",
  },
});
