import { memo, useCallback } from "react";
import { Entypo } from "@expo/vector-icons";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { CONSTANTS, colors } from "../../../../../utils";
import { IUserWord } from "../../../../../interfaces";
import { useBottomSheet } from "../../../../../hooks";

interface IWordItemRightAction {
  word: IUserWord;
}

export const WordItemRightAction = memo(({ word }: IWordItemRightAction) => {
  const { openDeleteUserWordBS } = useBottomSheet();
  const onPress = useCallback(() => openDeleteUserWordBS(word), [word]);

  return (
    <Animated.View style={[styles.deleteIconContainer]}>
      <TouchableOpacity onPress={onPress}>
        <Entypo name="trash" size={20} color={colors.error} />
      </TouchableOpacity>
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
