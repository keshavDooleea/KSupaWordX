import { NowRequest, NowResponse } from "@now/node";
import { ISupaRequest } from "../../src/interfaces";
import { RequestValidator } from "../../src/utils";

const handler = async (req: NowRequest, res: NowResponse) => {
  const supaRequest = (await req.body) as ISupaRequest;

  if (!RequestValidator.isValid(supaRequest)) {
    console.log("INVAL");
    res.send("Invalid Request");
    return;
  }

  console.log("GOT IT 2", supaRequest);
  res.send("OK");
};

export default handler;
