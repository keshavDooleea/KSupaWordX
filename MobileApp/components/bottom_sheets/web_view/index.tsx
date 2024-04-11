import BaseBottomSheet from "../base";
import { useBottomSheet } from "../../../hooks";
import { ActivityIndicator } from "react-native";
import { WordDefinitionTab } from "./tabs/definition";
import { ETabType, ITab } from "../../../interfaces";
import { WordTranslationTab } from "./tabs/translation";
import { Tabs } from "../../Tabs";

const tabs: ITab[] = [
  {
    name: "Definition",
    type: ETabType.definition,
    component: (user) => <WordDefinitionTab userWord={user} />,
  },
  {
    name: "Translation",
    type: ETabType.translation,
    component: (user) => <WordTranslationTab userWord={user} />,
  },
];

export const WebViewBottomSheet = () => {
  const { webViewWord } = useBottomSheet();

  return <BaseBottomSheet shouldOpen={!!webViewWord}>{webViewWord ? <Tabs tabs={tabs} /> : <ActivityIndicator />}</BaseBottomSheet>;
};
