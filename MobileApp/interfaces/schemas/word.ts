import { ELanguageType } from "../language";
import { EVocabType } from "../vocab";

export interface IWords {
  category_type: EVocabType;
  language_type: ELanguageType;
  word: string;
}
