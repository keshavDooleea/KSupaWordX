import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { ISupaPayload } from "../interfaces";
import { ENV } from "./Env";

export class SupabaseHandler {
  private client: SupabaseClient;
  private table: string;

  constructor(private word: ISupaPayload) {
    this.init();
  }

  private init(): void {
    this.table = ENV.supabaseTable;
    this.client = createClient(ENV.supabaseURL, ENV.supabaseAnonKey);
  }

  async doesWordExist(): Promise<boolean> {
    const { data } = await this.client.from(this.table).select().eq("id", this.word.id).eq("word", this.word.word);
    return data && data.length > 0;
  }

  async addTranslationsToWord(translations: string[]): Promise<void> {
    await this.client.from(this.table).update({ translations }).eq("id", this.word.id);
  }
}
