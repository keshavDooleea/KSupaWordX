import { useMemo } from "react";
import { ECategoryType } from "../../../../../interfaces";
import { MyInput } from "../../../../MyInput";
import { KeyboardTypeOptions } from "react-native";

interface IOptionUrlWordBodyProp {
  selectedCategoryType: ECategoryType;
  text: string;
  onTextChanged: (text: string) => void;
}

export const OptionUrlWordBody = ({ selectedCategoryType, onTextChanged, text }: IOptionUrlWordBodyProp) => {
  const type = useMemo((): KeyboardTypeOptions => (selectedCategoryType === ECategoryType.url ? "url" : "default"), [selectedCategoryType]);
  const placeholder = useMemo((): string => (selectedCategoryType === ECategoryType.url ? "Enter a URL" : "Enter a Word"), [selectedCategoryType]);

  return <MyInput onChange={onTextChanged} type={type} placeholder={placeholder} text={text} />;
};
