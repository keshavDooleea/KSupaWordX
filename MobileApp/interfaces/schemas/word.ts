import { ELanguageType } from "../language";
import { ECategoryType } from "../vocab";

export interface IWords {
  category_type: ECategoryType;
  language_type: ELanguageType;
  word: string;
}
