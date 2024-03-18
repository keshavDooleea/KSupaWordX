import { StyleSheet } from "react-native";
import { colors } from "./colors";
import { CONSTANTS } from "../constants";

export const globalStyles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  mt10: {
    marginTop: 10,
  },
  mt20: {
    marginTop: CONSTANTS.styles.margin.l,
  },
  border: {
    borderWidth: 3,
    borderColor: colors.border,
  },
  button: {
    backgroundColor: colors.main,
  },
});
