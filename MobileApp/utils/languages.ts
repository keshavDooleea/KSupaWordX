import { ELanguageName, ELanguageType } from "../interfaces";

export class Language {
  static getName = (lang: ELanguageType): ELanguageName => {
    const name = lang === ELanguageType.en ? ELanguageName.en : ELanguageName.fr;
    return name;
  };
}
