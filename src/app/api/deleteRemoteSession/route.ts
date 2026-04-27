import { Session } from "@/db/model";

export const GET = async (req: Request) => {
  const id = req.url.split("?id=")[1];

  await Session.findOneAndDelete({ id });
};
