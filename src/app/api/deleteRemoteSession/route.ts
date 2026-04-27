import { Session, dbConnect } from "@/db/model";

export const GET = async (req: Request) => {
  await dbConnect()

  const id = req.url.split("?id=")[1];

  await Session.findOneAndDelete({ id });
};
