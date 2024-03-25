export enum ELanguageName {
  en = "English",
  fr = "French",
}

export enum ELanguageType {
  en = "en",
  fr = "fr",
}

export interface ILanguage {
  type: ELanguageType;
  name: string;
}
