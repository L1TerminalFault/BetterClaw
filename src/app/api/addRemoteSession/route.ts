import { addSession } from "@/db/model";

export const POST = async (req: Request) => {
  const { session } = await req.json();

  await addSession(session);
};
