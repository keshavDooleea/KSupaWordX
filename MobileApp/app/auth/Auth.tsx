import React, { useState } from "react";
import { StyleSheet, View, AppState } from "react-native";
import { Button, Input } from "react-native-elements";
import { Text } from "react-native";
import { supabase, globalStyles, colors } from "../../utils";
import { useAuth } from "../../hooks";

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
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { signInWithEmail, signUpWithEmail, isLoading } = useAuth();

  async function logIn() {
    await signInWithEmail({ email, password });
  }

  async function signUp() {
    await signUpWithEmail({ email, password });
  }

  return (
    <View style={authStyles.frame}>
      <View style={authStyles.authContainer}>
        <View style={[authStyles.verticallySpaced, globalStyles.mt20]}>
          <Input label="Email" leftIcon={{ type: "font-awesome", name: "envelope" }} onChangeText={(text) => setEmail(text)} value={email} placeholder="email@address.com" autoCapitalize={"none"} />
        </View>
        <View style={authStyles.verticallySpaced}>
          <Input label="Password" leftIcon={{ type: "font-awesome", name: "lock" }} onChangeText={(text) => setPassword(text)} value={password} secureTextEntry={true} placeholder="Password" autoCapitalize={"none"} />
        </View>

        <View style={[authStyles.verticallySpaced, globalStyles.mt20]}>
          <Button buttonStyle={globalStyles.button} title="Log In" disabled={isLoading} onPress={logIn} />
        </View>

        <View style={authStyles.signUpView}>
          <Text>Don't have an account? </Text>
          <Text onPress={signUp} style={authStyles.signUpText}>
            Sign Up
          </Text>
        </View>
      </View>
    </View>
  );
}

const authStyles = StyleSheet.create({
  frame: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  authContainer: {
    ...globalStyles.border,
    marginTop: 40,
    padding: 12,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  signUpView: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
  },
  signUpText: {
    color: colors.main,
    fontWeight: "bold",
  },
});
