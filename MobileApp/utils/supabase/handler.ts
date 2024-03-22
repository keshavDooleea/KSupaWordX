import { useAlert } from "../../hooks/useAlert";
import { IWords } from "../../interfaces";
import { supabase } from "./client";
import { SupabaseTypes } from "./types";

export class SupabaseDB {
  private static showError = useAlert().showError;
  private static showSuccess = useAlert().showSuccess;

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

      const { error: urlError } = await supabase.from(SupabaseTypes.URLS).insert(
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
