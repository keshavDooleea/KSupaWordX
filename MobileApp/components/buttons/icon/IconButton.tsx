import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors, globalStyles } from "../../../utils";
import { Entypo } from "@expo/vector-icons";

interface IIconButtonProp {
  onPressed: () => void;
  iconName: string;
}

export default function IconButton({ onPressed, iconName }: IIconButtonProp) {
  return (
    <TouchableOpacity onPress={onPressed} style={styles.container}>
      <Entypo name={iconName as any} size={20} color={colors.text.subtitle} />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    ...globalStyles.border,
    backgroundColor: colors.background.secondary,
    padding: 5,
  },
});
