import { memo, useCallback } from "react";
import { Entypo } from "@expo/vector-icons";
import { Animated, StyleSheet } from "react-native";
import { CONSTANTS, colors } from "../../../../../utils";
import { IUserWord } from "../../../../../interfaces";

interface IWordItemRightAction {
  word: IUserWord;
}

export const WordItemRightAction = memo(({ word }: IWordItemRightAction) => {
  const onPress = useCallback(() => {
    console.log("P", word.word.word);
  }, [word]);

  return (
    <Animated.View style={[styles.deleteIconContainer]}>
      <Entypo name="trash" size={20} color={colors.error} onPress={onPress} />
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  deleteIconContainer: {
    color: "red",
    alignSelf: "center",
    margin: CONSTANTS.styles.margin.m,
  },
});
