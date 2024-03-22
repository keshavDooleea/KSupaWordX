import { ELanguageType, ECategoryType, IWords } from "../../interfaces";
import { SupabaseDB } from "./handler";

class WordManager {
  async createWord(categoryType: ECategoryType, languageType: ELanguageType, text: string): Promise<boolean> {
    const newWord: IWords = {
      category_type: categoryType,
      language_type: languageType,
      word: text,
    };

    switch (categoryType) {
      case ECategoryType.word: {
        return await SupabaseDB.createWord(newWord, ["AAAA", "BBBB", "c"]);
      }
      case ECategoryType.url: {
        return await SupabaseDB.createWord(newWord, ["url"]);
      }
      case ECategoryType.image: {
        // this.createWordUrl.create();
        return true;
      }
    }
  }
}

export const wordManager = new WordManager();
