import { ActivityIndicator, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ELanguageType, IUserWord } from "../../../../interfaces";
import { useEffect, useState } from "react";
import { CONSTANTS, SupabaseDB, colors } from "../../../../utils";
import { useAuth, useDimensions } from "../../../../hooks";
import { MyText } from "../../../../components";
import { WordItem } from "./WordItem";

interface IWordsListProps {
  selectedLanguage: ELanguageType;
}

export const WordsList = ({ selectedLanguage }: IWordsListProps) => {
  const { user } = useAuth();
  const { height } = useDimensions();
  const [userWords, setUserWords] = useState<IUserWord[]>([]);
  const [isFetchingWords, setIsFetchingWords] = useState<boolean>(true);

  const getWords = async () => {
    setIsFetchingWords(true);
    const words = await SupabaseDB.getUserWords(user?.id, selectedLanguage);
    setUserWords(words ?? []);
    setIsFetchingWords(false);
  };

  useEffect(() => {
    if (selectedLanguage) getWords();
  }, [selectedLanguage]);

  if (isFetchingWords) {
    return (
      <View style={styles.spinnerContainer}>
        <ActivityIndicator color={colors.text.title} size="large" />
      </View>
    );
  }

  return (
    <View style={styles.flashContainer}>
      <FlashList
        data={userWords}
        refreshing={isFetchingWords}
        onRefresh={getWords}
        ListEmptyComponent={
          <View style={[{ height: height - 90 }, styles.spinnerContainer]}>
            <MyText text="No words saved yet.." />
          </View>
        }
        renderItem={({ item }) => <WordItem word={item} />}
        estimatedItemSize={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flashContainer: {
    flex: 1,
    marginTop: CONSTANTS.styles.margin.m,
  },
  spinnerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
