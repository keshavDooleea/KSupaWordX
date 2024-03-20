import { LANGUAGES } from "../../utils";
import { SegmentedControl } from ".";
import { ELanguageType } from "../../interfaces";

interface ILanguageCheckboxProps {
  onPressed: (type: ELanguageType) => void;
  selectedLanguageType: ELanguageType;
}

export const LanguageSegmentedControl = ({ onPressed, selectedLanguageType }: ILanguageCheckboxProps) => {
  return <SegmentedControl types={LANGUAGES} onPressed={onPressed} selectedType={selectedLanguageType} />;
};
