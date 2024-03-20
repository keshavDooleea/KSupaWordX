import { LANGUAGES } from "../../utils";
import { MyCheckbox } from "./MyCheckbox";
import { ELanguageType } from "../../interfaces";

interface ILanguageCheckboxProps {
  onPressed: (type: ELanguageType) => void;
  selectedLanguageType: ELanguageType;
}

export const LanguageCheckbox = ({ onPressed, selectedLanguageType }: ILanguageCheckboxProps) => {
  return <MyCheckbox types={LANGUAGES} onPressed={onPressed} selectedType={selectedLanguageType} />;
};
