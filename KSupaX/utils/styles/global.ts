import { StyleSheet } from "react-native";
import { colors } from "./colors";

export const globalStyles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  mt10: {
    marginTop: 10,
  },
  mt20: {
    marginTop: 20,
  },
  border: {
    borderWidth: 3,
    borderColor: colors.border,
  },
  button: {
    backgroundColor: colors.main,
  },
});
