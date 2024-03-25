import { SegmentedControl } from ".";
import { ELanguageType, ILanguage } from "../../interfaces";

interface ILanguageCheckboxProps {
  languages: ILanguage[];
  onPressed: (type: ELanguageType) => void;
  selectedLanguageType: ELanguageType;
}

export const LanguageSegmentedControl = ({ languages, onPressed, selectedLanguageType }: ILanguageCheckboxProps) => {
  return <SegmentedControl types={languages} onPressed={onPressed} selectedCategoryType={selectedLanguageType} />;
};
