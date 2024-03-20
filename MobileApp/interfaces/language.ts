export enum ELanguageType {
  en,
  fr,
}

export interface ILanguage {
  type: ELanguageType;
  name: string;
}
