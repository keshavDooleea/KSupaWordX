import { VercelResponse } from "@vercel/node";
import { ISupaRequest } from "../interfaces";
import { ENV } from "./Env";

export class RequestHandler {
  static isRequestValid({ type, table }: ISupaRequest): boolean {
    if (!type || !table) return false;
    return type === ENV.supabaseType && table === ENV.supabaseTable;
  }

  static sendResponse(res: VercelResponse, message: string): void {
    console.log(message);
    res.send(message);
  }
}
