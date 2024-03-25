import BaseBottomSheet from "../base";
import { useBottomSheet } from "../../../hooks";
import { MyText } from "../../MyText";

export const WebViewBottomSheet = () => {
  const { webViewWord } = useBottomSheet();

  return (
    <BaseBottomSheet shouldOpen={!!webViewWord}>
      <MyText text={webViewWord?.word.word} />
    </BaseBottomSheet>
  );
};
