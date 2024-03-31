import { Keyboard, KeyboardAvoidingView, KeyboardTypeOptions, Platform, SafeAreaView, StyleProp, StyleSheet, TextInput, TextStyle, View } from "react-native";
import { CONSTANTS, colors, globalStyles } from "../utils";
import { useEffect, useRef, useState } from "react";
import { Entypo } from "@expo/vector-icons";

interface IMyInputProp {
  placeholder: string;
  type: KeyboardTypeOptions;
  initialText: string;
  onChange: (text: string) => void;
  inputContainerStyles?: StyleProp<unknown>;
  inputTextStyles?: StyleProp<unknown>;
  emitOnChange?: boolean;
}

export const MyInput = ({ placeholder, type, onChange, initialText, inputContainerStyles, inputTextStyles, emitOnChange = false }: IMyInputProp) => {
  const [currentValue, setCurrentValue] = useState<string>(initialText);
  const inputElement = useRef<TextInput | null>(null);
  const [iconStyles, setIconStyles] = useState<TextStyle>();

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

  const onClearText = () => {
    if (!currentValue) return;

    onChangeText("");
    onKeyboardDismiss();
  };

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", onEndEditing);

    const isSearching = currentValue.length > 0;
    setIconStyles({
      opacity: isSearching ? 1 : 0.3,
      pointerEvents: isSearching ? "auto" : "none",
    });

    return () => keyboardDidHideListener.remove();
  }, [currentValue]);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View style={[styles.inputContainer, inputContainerStyles!]}>
          <TextInput ref={inputElement} onChangeText={onChangeText} onEndEditing={onEndEditing} value={currentValue} keyboardType={type} onSubmitEditing={onKeyboardDismiss} style={[styles.input, inputTextStyles!]} placeholder={placeholder} />
          <Entypo name={"cross"} size={20} color={colors.text.subtitle} style={[styles.inputIcon, iconStyles]} onPress={onClearText} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: CONSTANTS.styles.radius,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background.secondary,
  },
  input: {
    ...globalStyles.font,
    paddingTop: CONSTANTS.styles.margin.m / 2,
    paddingBottom: CONSTANTS.styles.margin.m / 2,
    paddingLeft: CONSTANTS.styles.margin.m,
    paddingRight: CONSTANTS.styles.margin.m,
    borderRadius: CONSTANTS.styles.radius,
    flex: 1,
  },
  inputIcon: {
    paddingLeft: 4,
    paddingRight: 4,
  },
});
