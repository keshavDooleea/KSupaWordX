import { SupabaseClient } from "@supabase/supabase-js";
import { useAlert } from "../../hooks/useAlert";
import { ELanguageType, IDictUrls, ILanguage, IWords } from "../../interfaces";
import { SupabaseTypes } from "./types";
import { supabase } from "./client";
import { Language } from "../languages";

export type SupabaseClientDB = SupabaseClient<any, "public", any>;

export class SupabaseDB {
  private static showError = useAlert().showError;
  private static showSuccess = useAlert().showSuccess;

  static getLanguages(dictionaryUrls: IDictUrls[] | null): ILanguage[] {
    if (!dictionaryUrls) return [];

    const languages = new Map<ELanguageType, ILanguage>();
    dictionaryUrls.forEach((url) => {
      languages.set(url.lang, { type: url.lang, name: Language.getName(url.lang) });
    });

    return Array.from(languages.values());
  }

  static async getDictionaryUrls(): Promise<IDictUrls[]> {
    const { data, error } = await supabase.from(SupabaseTypes.DICT_URLS).select().returns<IDictUrls[]>();
    return error ? [] : data;
  }

  static async createWord(newWord: IWords, urls: string[]): Promise<boolean> {
    const { word } = newWord;

    try {
      const { data: wordData, error: wordError } = await supabase.from(SupabaseTypes.WORDS).insert(newWord).select();

      if (wordError || !wordData) {
        SupabaseDB.showError(`"Error saving the word: ${word}`);
        console.log({ wordError });
        return false;
      }

      const { id: wordId } = wordData[0];

      const { error: urlError } = await supabase.from(SupabaseTypes.WORDS).insert(
        urls.map((url) => ({
          word_id: wordId,
          url,
        }))
      );

      if (urlError) {
        SupabaseDB.showError(`"Error saving urls for the word: ${word}`);
        console.log({ urlError });
        return false;
      }

      await supabase.from(SupabaseTypes.WORDS).update({ is_processing: false }).eq("id", wordId);
      this.showSuccess(`Word saved successfully`);
      return true;
    } catch (err) {
      SupabaseDB.showError(`"An error occurred while saving the word: ${word}`);
      console.log({ err });
      return false;
    }
  }
}
