import { NowRequest, NowResponse } from "@now/node";
import { ISupaRequest } from "../../src/interfaces";
import { RequestHandler, WordTranslate, PuppeteerTranslationService, SupabaseHandler } from "../../src/utils";

const handler = async (req: NowRequest, res: NowResponse) => {
  const supaRequest = (await req.body) as ISupaRequest;

  try {
    if (!RequestHandler.isRequestValid(supaRequest)) {
      return RequestHandler.sendResponse(res, "Invalid Response");
    }

    const supabase = new SupabaseHandler(supaRequest.record);

    if (!supabase.doesWordExist()) {
      return RequestHandler.sendResponse(res, "Invalid Word");
    }

    const wordTranslate = new WordTranslate(supaRequest.record, new PuppeteerTranslationService());
    const translations = await wordTranslate.translate();
    await supabase.addTranslationsToWord(translations);

    RequestHandler.sendResponse(res, "OK");
  } catch (err) {
    console.log({ error: err });
    RequestHandler.sendResponse(res, `Error during translation for ${supaRequest.record.id}`);
  }
};

export default handler;
