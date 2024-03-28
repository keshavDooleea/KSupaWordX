import { ISupaRequest } from "../interfaces";

export class RequestValidator {
  static isValid({ type, table }: ISupaRequest): boolean {
    return false;
    return type === process.env.SUPABASE_TRANSLATION_TYPE && table === process.env.SUPABASE_TRANSLATION_TABLE;
  }
}
