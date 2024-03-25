import { SupabaseClient } from "@supabase/supabase-js";
import { useAlert } from "../../hooks/useAlert";
import { ELanguageType, IDictUrl, ILanguage, IUserWord, IWord } from "../../interfaces";
import { SupabaseTypes } from "./types";
import { supabase } from "./client";
import { Language } from "../languages";

export type SupabaseClientDB = SupabaseClient<any, "public", any>;

export class SupabaseDB {
  private static showError = useAlert().showError;

  static getLanguages(dictionaryUrls: IDictUrl[] | null): ILanguage[] {
    if (!dictionaryUrls) return [];

    const languages = new Map<ELanguageType, ILanguage>();
    dictionaryUrls.forEach((url) => {
      languages.set(url.lang, { type: url.lang, name: Language.getName(url.lang) });
    });

    return Array.from(languages.values());
  }

  static async getDictionaryUrls(): Promise<IDictUrl[]> {
    const { data, error } = await supabase.from(SupabaseTypes.DICT_URLS).select().returns<IDictUrl[]>();
    return error ? [] : data;
  }

  static async getWord(lang: ELanguageType, word: string): Promise<IWord | null> {
    const { data } = await supabase.from(SupabaseTypes.WORDS).select().eq("word", word.toLowerCase()).eq("lang", lang).limit(1).single();
    return data ?? null;
  }

  static async createWord(lang: ELanguageType, word: string): Promise<IWord | null> {
    const { data } = await supabase.from(SupabaseTypes.WORDS).insert({ word, lang }).select().returns<IWord[]>();
    return data ? data[0] : null;
  }

  static async getOrCreateWordId(lang: ELanguageType, word: string): Promise<string | null> {
    const newWord = word.toLowerCase();

    const existingWord: IWord | null = await this.getWord(lang, newWord);
    if (existingWord) return existingWord.id;

    const createdWord: IWord | null = await this.createWord(lang, newWord);
    if (createdWord) return createdWord.id;

    return null;
  }

  static async addWordForUser(userId: string | undefined, wordId: string, customUrl: string): Promise<boolean> {
    if (!wordId || !userId) {
      SupabaseDB.showError(`No Word or User found`);
      return false;
    }

    const { data, error } = await supabase.from(SupabaseTypes.USER_WORDS).insert({ word_id: wordId, user_id: userId, custom_word_url: customUrl }).select().returns<IUserWord[]>();

    if (error && error.code === "23505") {
      SupabaseDB.showError(`Word already exists`);
    }

    return !!data;
  }

  static async createUserWord(userId: string | undefined, lang: ELanguageType, word: string, customUrl: string): Promise<boolean> {
    try {
      const wordId = await this.getOrCreateWordId(lang, word);

      if (!wordId) {
        SupabaseDB.showError(`Error creating the word: ${word}`);
        return false;
      }

      return await this.addWordForUser(userId, wordId, customUrl);
    } catch (err) {
      SupabaseDB.showError(`"An error occurred while creating the word: ${word}`);
      console.log({ err });
      return false;
    }
  }
}
