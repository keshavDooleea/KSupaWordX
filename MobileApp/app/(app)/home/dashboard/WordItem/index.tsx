import { StyleSheet, View } from "react-native";
import { IUserWord } from "../../../../../interfaces";
import { MyText } from "../../../../../components";
import { CONSTANTS, DateUtil, colors } from "../../../../../utils";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useBottomSheet } from "../../../../../hooks";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { WordItemRightAction } from "./WordItemRightAction";

interface IWordItemProps {
  word: IUserWord;
  swipeRefs: Map<string, Swipeable | null>;
  closeRow: (wordId: string) => void;
}

export const WordItem = ({ word, swipeRefs, closeRow }: IWordItemProps) => {
  const { openWebViewBS } = useBottomSheet();

  return (
    <Swipeable ref={(ref) => swipeRefs.set(word.word_id, ref)} onSwipeableWillOpen={() => closeRow(word.word_id)} renderRightActions={() => <WordItemRightAction word={word} />}>
      <TouchableOpacity onPress={() => openWebViewBS(word)} style={styles.container}>
        <View style={styles.header}>
          <MyText text={word.word.word} style={styles.headerTitle} />
          <MyText text={DateUtil.getFormattedDate(word.created_at)} />
        </View>

        {word.custom_word_url && <MyText style={styles.customUrl} text="Custom" />}
      </TouchableOpacity>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: CONSTANTS.styles.margin.m,
    padding: CONSTANTS.styles.margin.m,
    paddingTop: CONSTANTS.styles.margin.l,
    paddingBottom: CONSTANTS.styles.margin.l,
    backgroundColor: colors.background.secondary,
    borderRadius: CONSTANTS.styles.radius,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontWeight: "bold",
  },
  customUrl: {
    padding: 5,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    marginTop: 8,
    marginRight: "auto",
    borderRadius: CONSTANTS.styles.radius,
  },
  deleteIconContainer: {
    color: "red",
    alignSelf: "center",
    margin: CONSTANTS.styles.margin.m,
  },
});
