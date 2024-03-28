import { NowResponse } from "@now/node";
import { ISupaRequest } from "../interfaces";
import { ENV } from "./Env";

export class RequestHandler {
  static isRequestValid({ type, table }: ISupaRequest): boolean {
    if (!type || !table) return false;
    return type === ENV.supabaseType && table === ENV.supabaseTable;
  }

  static sendResponse(res: NowResponse, message: string): void {
    console.log(message);
    res.send(message);
  }
}
