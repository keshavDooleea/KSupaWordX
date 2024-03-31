import { StyleSheet, View } from "react-native";
import BaseBottomSheet from "./base";
import { useBottomSheet } from "../../hooks";
import { MyText } from "../MyText";
import { CONSTANTS, Language } from "../../utils";
import { MyButton } from "../MyButton";

export const DeleteBottomSheet = () => {
  const { deleteUserWord, closeDeleteUserWordBS } = useBottomSheet();

  if (!deleteUserWord) return;

  return (
    <BaseBottomSheet shouldOpen={!!deleteUserWord}>
      <MyText text="Remove word from list?" />
      <MyText text={deleteUserWord.word.word} style={styles.title} />
      <MyText text={`(${Language.getName(deleteUserWord.word.lang)})`} style={styles.langTitle} />

      <View style={styles.btnsContainer}>
        <MyButton kind="secondary" onPressed={closeDeleteUserWordBS} titleLoading="" titleNormal="Cancel" styles={styles.btn} />
        <MyButton kind="delete" onPressed={closeDeleteUserWordBS} titleLoading="" titleNormal="Delete" styles={styles.btn} />
      </View>
    </BaseBottomSheet>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: CONSTANTS.styles.margin.l,
    fontWeight: "bold",
    fontSize: 20,
  },
  langTitle: {
    marginBottom: CONSTANTS.styles.margin.l,
    fontSize: 13,
  },
  btnsContainer: {
    marginTop: CONSTANTS.styles.margin.l,
    flexDirection: "row",
    flex: 1,
  },
  btn: {
    width: "70%",
    alignSelf: "center",
  },
});
