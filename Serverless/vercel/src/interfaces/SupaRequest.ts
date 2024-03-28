import { ISupaPayload } from "./SupaPayload";

export interface ISupaRequest {
  type: string;
  table: string;
  record: ISupaPayload;
}
