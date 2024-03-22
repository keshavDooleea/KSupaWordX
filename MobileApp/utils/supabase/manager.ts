import { ELanguageType, EVocabType, IWords } from "../../interfaces";
import { SupabaseDB } from "./handler";

class WordManager {
  async createWord(categoryType: EVocabType, languageType: ELanguageType, text: string) {
    const newWord: IWords = {
      category_type: categoryType,
      language_type: languageType,
      word: text,
    };

    switch (categoryType) {
      case EVocabType.word: {
        await SupabaseDB.createWord(newWord, ["AAAA", "BBBB", "c"]);
        break;
      }
      case EVocabType.url: {
        await SupabaseDB.createWord(newWord, ["url"]);
        break;
      }
      case EVocabType.image: {
        // this.createWordUrl.create();
        break;
      }
    }
  }
}

export const wordManager = new WordManager();
