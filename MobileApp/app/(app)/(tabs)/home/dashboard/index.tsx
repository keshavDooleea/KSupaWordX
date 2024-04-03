import { View } from "react-native";
import { LanguageSegmentedControl } from "../../../../../components";
import { useSupabase, useWords } from "../../../../../hooks";
import { useCallback } from "react";
import { ELanguageType } from "../../../../../interfaces";
import { WordsList } from "./WordsList";

export const HomeDashboard = () => {
  const { languages } = useSupabase();
  const { currentLang, setCurrentLang } = useWords();

  const onLanguagePressed = useCallback((type: ELanguageType) => setCurrentLang(type), []);

  return (
    <View>
      <LanguageSegmentedControl languages={languages} onPressed={onLanguagePressed} selectedLanguageType={currentLang} />
      <WordsList />
    </View>
  );
};
