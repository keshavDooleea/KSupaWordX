import { IUserWord } from "../../../../../interfaces";
import { getTranslationURL } from "../../../../../utils";
import { MyWebView } from "../../../../MyWebView";

interface IWebViewBodyProps {
  userWord: IUserWord;
}

export const WordTranslationTab = ({ userWord }: IWebViewBodyProps) => {
  const uri = getTranslationURL(userWord);

  return <MyWebView uri={uri} />;
};
