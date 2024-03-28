import { ELanguageType } from "./Language";

export interface ISupaPayload {
  id: string;
  word: string;
  lang: ELanguageType;
}
