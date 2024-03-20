import { useMemo } from "react";
import { EVocabType } from "../../../../../interfaces";
import { MyInput } from "../../../../MyInput";
import { KeyboardTypeOptions } from "react-native";

interface IOptionUrlWordBodyProp {
  selectedType: EVocabType;
  onTextChanged: (text: string, type: EVocabType) => void;
}

export const OptionUrlWordBody = ({ selectedType, onTextChanged }: IOptionUrlWordBodyProp) => {
  const type = useMemo((): KeyboardTypeOptions => (selectedType === EVocabType.url ? "url" : "default"), [selectedType]);
  const placeholder = useMemo((): string => (selectedType === EVocabType.url ? "Enter a URL" : "Enter a Word"), [selectedType]);

  const onChange = (text: string) => onTextChanged(text, selectedType);

  return <MyInput onChange={onChange} type={type} placeholder={placeholder} />;
};
