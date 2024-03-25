import { IDictUrlWebView, IUserWord } from "../interfaces";
import { useSupabase } from "./useSupabase";

export const useWebViewUrls = (userWord: IUserWord): IDictUrlWebView[] => {
  const { dictionaryUrls } = useSupabase();
  if (!dictionaryUrls) return [];

  const dictionaryTypes: IDictUrlWebView[] = dictionaryUrls.map((url) => ({ type: url.dict_url, name: url.dict_name, lang: url.lang })).filter((url) => url.lang === userWord.word.lang);

  if (userWord.custom_word_url) {
    dictionaryTypes.push({
      type: userWord.custom_word_url,
      name: "Custom",
      lang: userWord.word.lang,
    });
  }

  return dictionaryTypes;
};
