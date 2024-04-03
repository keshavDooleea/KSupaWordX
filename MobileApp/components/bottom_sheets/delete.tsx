import { StyleSheet, View } from "react-native";
import BaseBottomSheet from "./base";
import { useBottomSheet } from "../../hooks";
import { MyText } from "../MyText";
import { CONSTANTS, Language, SupabaseDB } from "../../utils";
import { MyButton } from "../MyButton";
import { useState } from "react";

export const DeleteBottomSheet = () => {
  const { deleteUserWord, closeDeleteUserWordBS } = useBottomSheet();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const onDeleteWordPressed = async () => {
    if (!deleteUserWord) return;

    setIsDeleting(true);
    const isSuccess = await SupabaseDB.deleteUserWord(deleteUserWord);
    if (isSuccess) closeDeleteUserWordBS();
    setIsDeleting(false);
  };

  return (
    <BaseBottomSheet shouldOpen={!!deleteUserWord}>
      {deleteUserWord && (
        <>
          <MyText text="Remove word from list?" />
          <MyText text={deleteUserWord.word.word} style={styles.title} />
          <MyText text={`(${Language.getName(deleteUserWord.word.lang)})`} style={styles.langTitle} />

          <View style={styles.btnsContainer}>
            <MyButton kind="secondary" onPressed={closeDeleteUserWordBS} titleLoading="" titleNormal="Cancel" styles={styles.btn} />
            <MyButton kind="delete" onPressed={onDeleteWordPressed} titleLoading="Deleting" titleNormal="Delete" styles={styles.btn} isLoading={isDeleting} />
          </View>
        </>
      )}
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
