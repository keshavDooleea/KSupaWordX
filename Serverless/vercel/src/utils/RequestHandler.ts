import { NowResponse } from "@now/node";
import { ISupaRequest } from "../interfaces";

export class RequestHandler {
  static isRequestValid({ type, table }: ISupaRequest): boolean {
    if (!type || !table) return false;

    return type === process.env.SUPABASE_TRANSLATION_TYPE && table === process.env.SUPABASE_TRANSLATION_TABLE;
  }

  static sendResponse(res: NowResponse, message: string): void {
    console.log(message);
    res.send(message);
  }
}
