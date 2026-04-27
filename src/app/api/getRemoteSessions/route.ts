import { auth } from "@clerk/nextjs/server";
import {
  dbConnect,
  Message as MessageModel,
  Session as SessionModel,
} from "@/db/model";
import { Message } from "ai";

import { RemoteSession, RemoteMessage, Session } from "@/lib/types";

export const GET = async () => {
  await dbConnect();

  const { userId } = await auth();

  const userSessions: RemoteSession[] = await SessionModel.find({
    clerkId: userId,
  });
  const userMessages: RemoteMessage[] = await MessageModel.find({
    clerkId: userSessions[0].clerkId,
  });

  // INFO: Casting from RemoteSession to Session type
  const resSessions: Session[] = userSessions.map(
    ({ id, title, createdAt }: RemoteSession): Session => ({
      id,
      title,
      createdAt,
      messages: userMessages
        .filter((message) => message.sessionId === id)
        .map(
          ({ id, createdAt, content, role }: RemoteMessage): Message => ({
            id,
            createdAt,
            content,
            role,
          }),
        ),
    }),
  );

  return Response.json(resSessions);
};
