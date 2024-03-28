import { NowRequest, NowResponse } from "@now/node";
import { ISupaRequest, ITranslationService } from "../../src/interfaces";
import { RequestHandler, WordTranslate, PuppeteerTranslationService, SupabaseHandler } from "../../src/utils";

const handler = async (req: NowRequest, res: NowResponse) => {
  const supaRequest = (await req.body) as ISupaRequest;

  try {
    if (!RequestHandler.isRequestValid(supaRequest)) {
      return RequestHandler.sendResponse(res, "Invalid Response");
    }

    const supabase = new SupabaseHandler();

    const puppTranslationService: ITranslationService = new PuppeteerTranslationService();
    const wordTranslate = new WordTranslate(supaRequest.record, puppTranslationService);
    const translations = await wordTranslate.translate();

    RequestHandler.sendResponse(res, "OK");
  } catch (err) {
    console.log({ error: err });
    RequestHandler.sendResponse(res, `Error during translation for ${supaRequest.record.id}`);
  }
};

export default handler;
