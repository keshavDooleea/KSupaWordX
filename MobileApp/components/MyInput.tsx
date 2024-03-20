import { Keyboard, KeyboardAvoidingView, KeyboardTypeOptions, Platform, StyleSheet, TextInput } from "react-native";
import { CONSTANTS, colors, globalStyles } from "../utils";

interface IMyInputProp {
  placeholder: string;
  type: KeyboardTypeOptions;
  onChange: (text: string) => void;
}

export const MyInput = ({ placeholder, type, onChange }: IMyInputProp) => {
  return (
    <KeyboardAvoidingView enabled behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TextInput onChangeText={onChange} keyboardType={type} onSubmitEditing={Keyboard.dismiss} style={styles.input} placeholder={placeholder} />
    </KeyboardAvoidingView>
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
