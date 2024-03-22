import { ELanguageType, ECategoryType, IWords } from "../../interfaces";
import { SupabaseDB } from "./handler";

class WordManager {
  async createWord(categoryType: ECategoryType, languageType: ELanguageType, text: string) {
    const newWord: IWords = {
      category_type: categoryType,
      language_type: languageType,
      word: text,
    };

    switch (categoryType) {
      case ECategoryType.word: {
        await SupabaseDB.createWord(newWord, ["AAAA", "BBBB", "c"]);
        break;
      }
      case ECategoryType.url: {
        await SupabaseDB.createWord(newWord, ["url"]);
        break;
      }
      case ECategoryType.image: {
        // this.createWordUrl.create();
        break;
      }
    }
  }
}

export const wordManager = new WordManager();
