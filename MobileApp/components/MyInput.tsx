import { Keyboard, KeyboardAvoidingView, KeyboardTypeOptions, Platform, SafeAreaView, StyleSheet, TextInput } from "react-native";
import { CONSTANTS, colors, globalStyles } from "../utils";
import { useEffect, useState } from "react";

interface IMyInputProp {
  placeholder: string;
  type: KeyboardTypeOptions;
  text: string;
  onChange: (text: string) => void;
}

export const MyInput = ({ placeholder, type, onChange, text }: IMyInputProp) => {
  const [currentValue, setCurrentValue] = useState<string>(text);

  const onChangeText = (t: string): void => setCurrentValue(t);
  const onEndEditing = () => onChange(currentValue);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", onEndEditing);
    return () => keyboardDidHideListener.remove();
  }, [currentValue]);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TextInput onChangeText={onChangeText} onEndEditing={onEndEditing} value={currentValue} keyboardType={type} onSubmitEditing={Keyboard.dismiss} style={styles.input} placeholder={placeholder} />
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
