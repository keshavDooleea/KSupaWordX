import { StyleSheet, View } from "react-native";
import { colors } from "../utils";
import { Entypo } from "@expo/vector-icons";
import { MyText } from "./MyText";
import { useDimensions } from "../hooks";

interface IBulletList {
  text: string;
  useFullWidth?: boolean;
}

export const BulletList = ({ text, useFullWidth = true }: IBulletList) => {
  const { segmentedControlWidth } = useDimensions();

  return (
    <View style={[useFullWidth && { width: segmentedControlWidth }, styles.container]}>
      <Entypo name="open-book" size={24} color={colors.text.subtitle} />
      <MyText text={text} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
