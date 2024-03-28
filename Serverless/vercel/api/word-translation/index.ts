import { NowRequest, NowResponse } from "@now/node";

const handler = async (req: NowRequest, res: NowResponse) => {
  console.log({ req });
  res.send({ message: "Vercel typescript API boilerplate kkk" });
};

export default handler;
