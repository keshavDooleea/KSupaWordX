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
  font: {
    fontFamily: "IBM",
  },
  fullWidth: {
    width: "100%",
  },
  mt10: {
    marginTop: 10,
  },
  mt20: {
    marginTop: CONSTANTS.styles.margin.l,
  },
  border: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: CONSTANTS.styles.radius,
  },
  button: {
    backgroundColor: colors.background.accentPrimary,
  },
  shadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  text: {
    fontFamily: "IBM",
  },
});
