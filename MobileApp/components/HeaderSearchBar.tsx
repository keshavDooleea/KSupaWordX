import { StyleSheet } from "react-native";
import { MyInput } from "./MyInput";
import { useWords } from "../hooks";

export const HeaderSearchBar = () => {
  const { currentSearch, setCurrentSearch } = useWords();

  return <MyInput onChange={(text) => setCurrentSearch(text)} initialText={currentSearch} placeholder="Search word" type="default" inputContainerStyles={styles.inputContainer} emitOnChange={true} />;
};

const styles = StyleSheet.create({
  inputContainer: {
    width: 200,
    paddingTop: 0,
    paddingBottom: 0,
  },
});
