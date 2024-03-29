import { VercelRequest, VercelResponse } from "@vercel/node";
import { ISupaRequest } from "../../src/interfaces";
import { RequestHandler, WordTranslate, PuppeteerTranslationService, SupabaseHandler } from "../../src/utils";

const handler = async (req: VercelRequest, res: VercelResponse) => {
  const supaRequest = (await req.body) as ISupaRequest;

  try {
    if (!RequestHandler.isRequestValid(supaRequest)) {
      return RequestHandler.sendResponse(res, "Invalid Response");
    }

    console.log("in");

    const supabase = new SupabaseHandler(supaRequest.record);

    if (!supabase.doesWordExist()) {
      return RequestHandler.sendResponse(res, "Invalid Word");
    }

    const wordTranslate = new WordTranslate(supaRequest.record, new PuppeteerTranslationService());
    const translations = await wordTranslate.translate();
    await supabase.addTranslationsToWord(translations);

    RequestHandler.sendResponse(res, "OK");
  } catch (err) {
    console.log(err);
    RequestHandler.sendResponse(res, `Error during translation for ${supaRequest.record.id}`);
  }
};

export default handler;
