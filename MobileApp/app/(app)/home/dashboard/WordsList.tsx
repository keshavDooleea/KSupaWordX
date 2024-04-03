import { ActivityIndicator, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { CONSTANTS, colors } from "../../../../utils";
import { useDimensions, useWords } from "../../../../hooks";
import { MyText } from "../../../../components";
import { WordItem } from "./WordItem";

export const WordsList = () => {
  const { height } = useDimensions();
  const { fetchWords, isFetchingWords, userWordsDisplayed, currentSearch } = useWords();

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
        data={userWordsDisplayed}
        refreshing={isFetchingWords}
        onRefresh={fetchWords}
        ListEmptyComponent={
          <View style={[{ height: height - 90 }, styles.spinnerContainer]}>
            <MyText text={userWordsDisplayed.length === 0 && currentSearch ? `No words with search '${currentSearch}' found..` : "No words saved yet.."} />
          </View>
        }
        renderItem={({ item, index }) => {
          const alphabet = item.word.word[0];

          if (userWordsDisplayed[index - 1] && userWordsDisplayed[index - 1].word.word[0] === alphabet) {
            return <WordItem word={item} />;
          }

          return (
            <>
              <MyText text={alphabet.toUpperCase()} style={styles.alphabet} />
              <WordItem word={item} />
            </>
          );
        }}
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
  alphabet: {
    marginTop: CONSTANTS.styles.margin.l,
    fontSize: 12,
    color: colors.text.title,
  },
});
