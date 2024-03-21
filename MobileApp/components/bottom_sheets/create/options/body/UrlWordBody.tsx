import { useMemo } from "react";
import { EVocabType } from "../../../../../interfaces";
import { MyInput } from "../../../../MyInput";
import { KeyboardTypeOptions } from "react-native";

interface IOptionUrlWordBodyProp {
  selectedType: EVocabType;
  text: string;
  onTextChanged: (text: string) => void;
}

export const OptionUrlWordBody = ({ selectedType, onTextChanged, text }: IOptionUrlWordBodyProp) => {
  const type = useMemo((): KeyboardTypeOptions => (selectedType === EVocabType.url ? "url" : "default"), [selectedType]);
  const placeholder = useMemo((): string => (selectedType === EVocabType.url ? "Enter a URL" : "Enter a Word"), [selectedType]);

  return <MyInput onChange={onTextChanged} type={type} placeholder={placeholder} text={text} />;
};
