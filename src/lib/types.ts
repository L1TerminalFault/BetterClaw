import { Message } from "ai";
import { IconType } from "react-icons";

export type Session = {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number | undefined;
};

export type StarterPrompt = {
  id: number;
  title: string;
  prompt: string;
  icon: IconType;
};

export type RemoteSession = {
  id: string;
  clerkId: string;
  title: string;
  createdAt: number;
};

export type RemoteMessage = Message & {
  clerkId: string;
  sessionId: string;
};
