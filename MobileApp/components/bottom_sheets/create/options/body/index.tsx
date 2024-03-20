import { View } from "react-native";
import { ELanguageType, EVocabType } from "../../../../../interfaces";
import { OptionUrlWordBody } from "./UrlWordBody";
import { LanguageCheckbox } from "../../../../Checkboxes/LanguageCheckbox";
import { useCallback, useState } from "react";
import { LANGUAGES } from "../../../../../utils";
import { OptionImageBody } from "./ImageBody";

interface IOptionBodyProp {
  selectedType: EVocabType;
}

export const OptionBody = ({ selectedType }: IOptionBodyProp) => {
  const [selectedLanguageType, setSelectedLanguageType] = useState<ELanguageType>(LANGUAGES[0].type);

  const onLanguagePressed = useCallback((type: ELanguageType) => setSelectedLanguageType(type), []);

  const Body = () => {
    switch (selectedType) {
      case EVocabType.url:
      case EVocabType.word:
        return <OptionUrlWordBody selectedType={selectedType} />;
      case EVocabType.image:
        return <OptionImageBody />;
    }
  };

  return (
    <View>
      <LanguageCheckbox onPressed={onLanguagePressed} selectedLanguageType={selectedLanguageType} />
      <Body />
    </View>
  );
};
