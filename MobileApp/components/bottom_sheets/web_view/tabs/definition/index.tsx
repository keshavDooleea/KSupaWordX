import { SegmentedControl } from "../../../../SegmentedControl";
import { useWebViewUrls } from "../../../../../hooks";
import { useState } from "react";
import { IUserWord } from "../../../../../interfaces";
import { MyWebView } from "../../../../MyWebView";

interface IWebViewBodyProps {
  userWord: IUserWord;
}

export const WordDefinitionTab = ({ userWord }: IWebViewBodyProps) => {
  const dictionaryTypes = useWebViewUrls(userWord);

  const [selectedDictionary, setSelectedDictionary] = useState<string>(dictionaryTypes[0].type);
  const onDictionaryUrlPressed = (type: string) => setSelectedDictionary(type);

  const uri = `${selectedDictionary}${userWord.word.word}`;

  return (
    <MyWebView uri={uri}>
      <SegmentedControl types={dictionaryTypes} onPressed={onDictionaryUrlPressed} selectedCategoryType={selectedDictionary} />
    </MyWebView>
  );
};
