import { IUserWord } from "../interfaces";
import { useSupabase } from "./useSupabase";

export const useWebViewUrls = (userWord: IUserWord) => {
  const { dictionaryUrlsForWebView } = useSupabase();
  const dictionaryTypes = dictionaryUrlsForWebView.filter((url) => url.lang === userWord.word.lang);

  if (userWord.custom_word_url) {
    dictionaryTypes.push({
      type: userWord.custom_word_url,
      name: "Custom",
      lang: userWord.word.lang,
    });
  }

  return { dictionaryTypes };
};
