import { StyleSheet, View } from "react-native";
import { LanguageSegmentedControl } from "../../../../components";
import { useAuth, useSupabase } from "../../../../hooks";
import { useCallback, useEffect, useState } from "react";
import { ELanguageType, IUserWord } from "../../../../interfaces";
import { SupabaseDB, globalStyles } from "../../../../utils";

export const HomeDashboard = () => {
  const { languages } = useSupabase();
  const { user } = useAuth();

  const [userWords, setUserWords] = useState<IUserWord[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<ELanguageType>(languages[0].type);

  const onLanguagePressed = useCallback((type: ELanguageType) => setSelectedLanguage(type), []);

  const getWords = async () => {
    const words = await SupabaseDB.getUserWords(user?.id, selectedLanguage);
    setUserWords(words ?? []);
  };

  useEffect(() => {
    if (selectedLanguage) getWords();
  }, [selectedLanguage]);

  return (
    <View>
      <View style={styles.languageContainer}>
        <LanguageSegmentedControl languages={languages} onPressed={onLanguagePressed} selectedLanguageType={selectedLanguage} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  languageContainer: {
    ...globalStyles.border,
  },
});
