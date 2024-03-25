import { View } from "react-native";
import { LanguageSegmentedControl } from "../../../../components";
import { useSupabase } from "../../../../hooks";
import { useCallback, useState } from "react";
import { ELanguageType } from "../../../../interfaces";
import { WordsList } from "./WordsList";

export const HomeDashboard = () => {
  const { languages } = useSupabase();

  const [selectedLanguage, setSelectedLanguage] = useState<ELanguageType>(languages[0].type);
  const onLanguagePressed = useCallback((type: ELanguageType) => setSelectedLanguage(type), []);

  return (
    <View>
      <LanguageSegmentedControl languages={languages} onPressed={onLanguagePressed} selectedLanguageType={selectedLanguage} />
      <WordsList selectedLanguage={selectedLanguage} />
    </View>
  );
};
