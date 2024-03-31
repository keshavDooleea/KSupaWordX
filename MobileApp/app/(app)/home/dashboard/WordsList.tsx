import { ActivityIndicator, StyleSheet, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { CONSTANTS, colors } from "../../../../utils";
import { useDimensions, useWords } from "../../../../hooks";
import { MyText } from "../../../../components";
import { WordItem } from "./WordItem";

export const WordsList = () => {
  const { height } = useDimensions();
  const { fetchWords, isFetchingWords, userWordsDisplayed } = useWords();

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
