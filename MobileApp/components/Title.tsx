import { StyleSheet } from "react-native";
import { MyText } from "./MyText";
import { CONSTANTS, colors } from "../utils";

interface ITitleProps {
  text: string | undefined;
}

export const Title = ({ text }: ITitleProps) => {
  return <MyText style={styles.title} text={text} />;
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    textAlign: "left",
    alignSelf: "flex-start",
    paddingBottom: CONSTANTS.styles.margin.m,
    color: colors.text.title,
  },
});
