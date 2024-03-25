import { StyleSheet, View } from "react-native";
import { IUserWord } from "../../../../interfaces";
import { MyText } from "../../../../components";
import { CONSTANTS, DateUtil, colors } from "../../../../utils";
import { TouchableOpacity } from "react-native-gesture-handler";

interface IWordItemProps {
  word: IUserWord;
}

export const WordItem = ({ word }: IWordItemProps) => {
  const onPressed = () => {};

  return (
    <TouchableOpacity onPress={onPressed} style={styles.container}>
      <View style={styles.header}>
        <MyText text={word.word.word} style={styles.headerTitle} />
        <MyText text={DateUtil.getFormattedDate(word.created_at)} />
      </View>
      <MyText style={styles.headerTranslation} text={"Heux"} />

      {word.custom_word_url && <MyText style={styles.customUrl} text="Custom" />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: CONSTANTS.styles.margin.m,
    padding: CONSTANTS.styles.margin.m,
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
  headerTranslation: {
    fontStyle: "italic",
  },
});
