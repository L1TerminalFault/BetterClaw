import { dbConnect, deleteSession } from "@/db/model";

export const GET = async (req: Request) => {
  await dbConnect();

  const id = req.url.split("?id=")[1];

  await deleteSession(id);
};
