import { StyleSheet } from "react-native";
import { MyInput } from "./MyInput";
import { useDimensions, useWords } from "../hooks";

export const HeaderSearchBar = () => {
  const { currentSearch, setCurrentSearch } = useWords();
  const { segmentedControlWidth } = useDimensions();
  const width = segmentedControlWidth * 0.7;

  return <MyInput onChange={(text) => setCurrentSearch(text)} initialText={currentSearch} placeholder="Search word" type="default" inputContainerStyles={[styles.inputContainer, { width }]} emitOnChange={true} />;
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingTop: 0,
    paddingBottom: 0,
  },
});
