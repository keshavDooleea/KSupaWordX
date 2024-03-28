import { NowRequest, NowResponse } from "@now/node";
import { ISupaRequest } from "../../src/interfaces";
import { RequestValidator } from "../../src/utils";

const handler = async (req: NowRequest, res: NowResponse) => {
  const supaRequest = (await req.body) as ISupaRequest;

  if (RequestValidator.isValid(supaRequest)) {
    res.send("Invalid Request");
  }

  console.log("GOT IT 2", supaRequest);
};

export default handler;
