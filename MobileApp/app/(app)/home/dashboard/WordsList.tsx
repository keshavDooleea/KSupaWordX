import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { ELanguageType, IUserWord } from "../../../../interfaces";
import { useEffect, useState } from "react";
import { SupabaseDB, colors } from "../../../../utils";
import { useAuth, useDimensions } from "../../../../hooks";
import { MyText } from "../../../../components";

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
    <View>
      <FlashList
        data={userWords}
        refreshing={isFetchingWords}
        onRefresh={getWords}
        ListEmptyComponent={
          <View style={[{ height: height - 90 }, styles.spinnerContainer]}>
            <MyText text="No words saved yet.." />
          </View>
        }
        renderItem={({ item }) => <Text>{item.word.word}</Text>}
        estimatedItemSize={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
