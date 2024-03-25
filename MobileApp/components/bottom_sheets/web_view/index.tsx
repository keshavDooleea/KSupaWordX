import BaseBottomSheet from "../base";
import { useBottomSheet } from "../../../hooks";
import { ActivityIndicator } from "react-native";
import { WebViewBody } from "./WebViewBody";

export const WebViewBottomSheet = () => {
  const { webViewWord } = useBottomSheet();

  return <BaseBottomSheet shouldOpen={!!webViewWord}>{webViewWord ? <WebViewBody userWord={webViewWord} /> : <ActivityIndicator />}</BaseBottomSheet>;
};
