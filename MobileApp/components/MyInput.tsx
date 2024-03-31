import { Keyboard, KeyboardAvoidingView, KeyboardTypeOptions, Platform, SafeAreaView, StyleProp, StyleSheet, TextInput } from "react-native";
import { CONSTANTS, colors, globalStyles } from "../utils";
import { useEffect, useRef, useState } from "react";

interface IMyInputProp {
  placeholder: string;
  type: KeyboardTypeOptions;
  text: string;
  onChange: (text: string) => void;
  style?: StyleProp<unknown>;
  emitOnChange?: boolean;
}

export const MyInput = ({ placeholder, type, onChange, text, style, emitOnChange = false }: IMyInputProp) => {
  const [currentValue, setCurrentValue] = useState<string>(text);
  const inputElement = useRef<TextInput | null>(null);

  const onChangeText = (t: string): void => {
    setCurrentValue(t);
    if (emitOnChange) onChange(t);
  };

  const onEndEditing = () => {
    onChange(currentValue);
    onKeyboardDismiss();
  };

  const onKeyboardDismiss = () => {
    Keyboard.dismiss();
    inputElement.current?.blur();
  };

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", onEndEditing);
    return () => keyboardDidHideListener.remove();
  }, [currentValue]);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TextInput ref={inputElement} onChangeText={onChangeText} onEndEditing={onEndEditing} value={currentValue} keyboardType={type} onSubmitEditing={onKeyboardDismiss} style={[styles.input, style!]} placeholder={placeholder} />
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
