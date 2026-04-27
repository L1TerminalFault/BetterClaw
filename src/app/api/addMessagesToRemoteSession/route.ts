import { auth } from "@clerk/nextjs/server";
import { Message } from "ai";

import { Message as MessageModel } from "@/db/model";
import { RemoteMessage } from "@/lib/types";

export const POST = async (req: Request) => {
  const { sessionId, messages } = await req.json();
  const { userId } = await auth();

  const prevMessages = await MessageModel.find({ sessionId, clerkId: userId });
  const newMessages: RemoteMessage[] = messages.filter((message: Message) =>
    prevMessages.find((prev) => prev.id === message.id) ? false : true,
  );

  await MessageModel.create(newMessages);
};
