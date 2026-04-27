import mongoose from "mongoose";

import { RemoteSession, RemoteMessage } from "@/lib/types";

const MONGODB_URI = process.env.MONGODB_URI || "";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null,
    promise: null,
  };
}

export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.conn;
}

// PERF: Previous connection method
// await (async () => {
//   await mongoose.connect(MONGODB_URI);
//   console.log("MongoDB connected");
// })();

const sessionSchema = new mongoose.Schema({
  id: String,
  clerkId: String,
  title: String,
});

const messageSchema = new mongoose.Schema({
  sessionId: String,
  createdAt: Date || null,
  content: String,
  role: String,
});

export const Message =
  mongoose.models.Message || mongoose.model("Message", messageSchema);

export const Session =
  mongoose.models.Session || mongoose.model("Session", sessionSchema);

export const addMessage = async ({
  sessionId,
  createdAt = new Date(Date.now()),
  content,
  role,
}: RemoteMessage) => {
  const messageObj = new Message({ sessionId, createdAt, content, role });
  await messageObj.save();
};

export const addSession = async ({ id, clerkId, title }: RemoteSession) => {
  const sessionObj = new Session({ id, clerkId, title });
  await sessionObj.save();
};

export const deleteSession = async (sessionId: string) => {
  Session.findOneAndDelete({ id: sessionId });
};

// export const addMessage = async ({
//   connectionString,
//   title,
//   message,
//   time,
// }) => {
//   const messageObj = new Message({ connectionString, title, message, time });
//   await messageObj.save();
// };
//
// export const addSession = async ({
//
// })
