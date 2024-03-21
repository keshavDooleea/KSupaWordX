import { Keyboard, KeyboardAvoidingView, KeyboardTypeOptions, Platform, SafeAreaView, StyleSheet, TextInput } from "react-native";
import { CONSTANTS, colors, globalStyles } from "../utils";
import { useState } from "react";

interface IMyInputProp {
  placeholder: string;
  type: KeyboardTypeOptions;
  text: string;
  onChange: (text: string) => void;
}

export const MyInput = ({ placeholder, type, onChange, text }: IMyInputProp) => {
  const [currentValue, setCurrentValue] = useState<string>(text);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView enabled={true} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TextInput onChangeText={(v) => setCurrentValue(v)} onEndEditing={() => onChange(currentValue)} value={currentValue} keyboardType={type} onSubmitEditing={Keyboard.dismiss} style={styles.input} placeholder={placeholder} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    ...globalStyles.font,
    backgroundColor: colors.background.secondary,
    padding: CONSTANTS.styles.margin.m / 2,
    borderRadius: CONSTANTS.styles.radius,
  },
});
