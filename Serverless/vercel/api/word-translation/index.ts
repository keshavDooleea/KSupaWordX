import { NowRequest, NowResponse } from "@now/node";

const handler = async (req: NowRequest, res: NowResponse) => {
  const { id: wordId, lang, word, ...w } = await req.body;

  console.log("GOT IT", w);
  console.log({ wordId, lang, word });

  res.send({ message: "Vercel typescript API boilerplate kkk" });
};

export default handler;
