import { Button, Input } from "react-native-elements";
import BaseBottomSheet from "./base";
import { useState } from "react";
import { useAuth } from "../../hooks";
import { CONSTANTS, colors, globalStyles } from "../../utils";
import { StyleSheet, View } from "react-native";
import { MyText } from "../MyText";

export const AuthBottomSheet = () => {
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
    <BaseBottomSheet shouldOpen={true} canClose={false}>
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
          <MyText text="Don't have an account?" />
          <MyText onPress={signUp} style={authStyles.signUpText} text="Sign Up" />
        </View>
      </View>
    </BaseBottomSheet>
  );
};

const authStyles = StyleSheet.create({
  authContainer: {
    padding: CONSTANTS.styles.margin.m,
    width: "100%",
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  signUpView: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    marginTop: CONSTANTS.styles.margin.m,
  },
  signUpText: {
    color: colors.background.accentPrimary,
    fontWeight: "bold",
  },
});
