import { StyleSheet } from "react-native";
import { MyInput } from "./MyInput";
import { CONSTANTS, colors } from "../utils";
import { useWords } from "../hooks";

export const HeaderSearchBar = () => {
  const { currentSearch, setCurrentSearch } = useWords();

  return <MyInput onChange={(text) => setCurrentSearch(text)} text={currentSearch} placeholder="Search word" type="default" style={styles.input} emitOnChange={true} />;
};

const styles = StyleSheet.create({
  input: {
    marginLeft: 60,
    marginRight: 60,
    paddingLeft: CONSTANTS.styles.margin.m,
    paddingRight: CONSTANTS.styles.margin.m,
    backgroundColor: colors.background.secondary,
    borderRadius: CONSTANTS.styles.radius,
    width: 200,
    paddingTop: 0,
    paddingBottom: 0,
  },
});
