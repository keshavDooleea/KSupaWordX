import { ELanguageType, IUserWord } from "../interfaces";

export const getTranslationURL = (word: IUserWord): string => {
  const BASE_URL = "https://translate.google.com";

  let sl = "";
  let tl = "";

  if (word.word.lang === ELanguageType.en) {
    sl = ELanguageType.en;
    tl = ELanguageType.fr;
  } else {
    sl = ELanguageType.fr;
    tl = ELanguageType.en;
  }

  return `${BASE_URL}/?sl=${sl}&tl=${tl}&text=${encodeURIComponent(word.word.word)}&op=translate`;
};
