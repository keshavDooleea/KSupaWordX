import { NowRequest, NowResponse } from "@now/node";
import { ISupaRequest } from "../../src/interfaces";
import { RequestHandler, WordTranslate } from "../../src/utils";

const handler = async (req: NowRequest, res: NowResponse) => {
  const supaRequest = (await req.body) as ISupaRequest;

  if (!RequestHandler.isRequestValid(supaRequest)) {
    return RequestHandler.sendResponse(res, "Invalid Response");
  }

  try {
    const wordTranslate = new WordTranslate(supaRequest.record);
    await wordTranslate.translate();

    RequestHandler.sendResponse(res, "OK");
  } catch (err) {
    console.log({ error: err });
    RequestHandler.sendResponse(res, `Error during translation for ${supaRequest.record.id}`);
  }
};

export default handler;
