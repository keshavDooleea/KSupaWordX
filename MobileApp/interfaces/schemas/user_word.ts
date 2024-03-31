import { IWord } from "./word";

export interface IUserWord {
  word_id: string;
  user_id: string;
  custom_word_url?: string;
  created_at: Date;
  word: IWord;
}
