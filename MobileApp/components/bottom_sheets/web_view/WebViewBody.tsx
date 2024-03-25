import { SafeAreaView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { SegmentedControl } from "../../SegmentedControl";
import { useDimensions, useWebViewUrls } from "../../../hooks";
import { useState } from "react";
import { IUserWord } from "../../../interfaces";
import { CONSTANTS } from "../../../utils";

interface IWebViewBodyProps {
  userWord: IUserWord;
}

export const WebViewBody = ({ userWord }: IWebViewBodyProps) => {
  const { webViewHeight, segmentedControlWidth } = useDimensions();
  const { dictionaryTypes } = useWebViewUrls(userWord);

  const [selectedDictionary, setSelectedDictionary] = useState<string>(dictionaryTypes[0].type);
  const onDictionaryUrlPressed = (type: string) => setSelectedDictionary(type);

  const uri = `${selectedDictionary}${userWord.word.word}`;

  return (
    <SafeAreaView style={[styles.container, { height: webViewHeight, width: segmentedControlWidth }]}>
      <SegmentedControl types={dictionaryTypes} onPressed={onDictionaryUrlPressed} selectedCategoryType={selectedDictionary} />
      <WebView style={styles.webViewContainer} source={{ uri }} nestedScrollEnabled />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  webViewContainer: {
    flex: 1,
    marginTop: CONSTANTS.styles.margin.l,
  },
});
