"use client";

import { Message } from "ai/react";
import { useEffect } from "react";

import MessageElm from "@/components/Message";

const messages = [
  {
    id: 0,
    content: "first",
    role: "users",
  },
  {
    id: 1,
    content: "fjkfsd",
    role: "user",
  },
  {
    id: 2,
    content: "fjkfsd",
    role: "user",
  },
  {
    id: 3,
    content: "fjkfsd",
    role: "user",
  },
  {
    id: 4,
    content: "fjkfsd",
    role: "user",
  },
  {
    id: 5,
    content: "fjkfsd",
    role: "user",
  },
  {
    id: 6,
    content: "fjkfsd",
    role: "user",
  },
  {
    id: 7,
    content: "fjkfsd",
    role: "user",
  },
  {
    id: 8,
    content: "fjkfsd",
    role: "user",
  },
  {
    id: 9,
    content: "fjkfsd",
    role: "user",
  },
  {
    id: 10,
    content: "fjkfsd",
    role: "user",
  },
  {
    id: 12,
    content: "fjkfsd",
    role: "user",
  },
  {
    id: 13,
    content:
      "fjkfsddskfljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    role: "assistant",
  },
  {
    id: 14,
    content:
      "fjkfsddskfljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    role: "assistant",
  },
  {
    id: 15,
    content:
      "fjkfsddskfljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    role: "assistant",
  },
  {
    id: 16,
    content:
      "fjkfsddskfljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    role: "assistant",
  },
  {
    id: 17,
    content:
      "fjkfsddskfljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    role: "assistant",
  },
  {
    id: 18,
    content:
      "fjkfsddskfljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    role: "assistant",
  },
  {
    id: 19,
    content:
      "fjkfsddskfljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    role: "assistant",
  },
  {
    id: 20,
    content:
      "fjkfsddskfljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    role: "assistant",
  },
  {
    id: 22,
    content:
      "fjkfsddskfljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    role: "assistant",
  },
  {
    id: 23,
    content:
      "fjkfsddskfljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    role: "assistant",
  },
  {
    id: 24,
    content:
      "fjkfsddskfljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    role: "assistant",
  },
  {
    id: 25,
    content:
      "fjkfsddskfljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    role: "assistant",
  },
  {
    id: 26,
    content:
      "fjkfsddskfljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    role: "assistant",
  },
  {
    id: 27,
    content:
      "fjkfsddskfljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    role: "assistant",
  },
  {
    id: 31,
    content:
      "fjkfsddskfljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    role: "assistant",
  },
  {
    id: 30,
    content:
      "fjkfsddskfljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    role: "assistant",
  },
  {
    id: 32,
    content:
      "fjkfsddskfljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    role: "assistant",
  },
  {
    id: 33,
    content:
      "fjkfsddskfljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    role: "assistant",
  },
  {
    id: 34,
    content:
      "fjkfsddskfljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    role: "assistant",
  },
  {
    id: 35,
    content:
      "fjkfsddskfljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    role: "assistant",
  },
  {
    id: 36,
    content:
      "fjkfsddskfljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    role: "user",
  },
  {
    id: 37,
    content:
      "fjkfsddskfljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    role: "assistant",
  },
  {
    id: 38,
    content: "fjkfsd",
    role: "user",
  },
  {
    id: 39,
    content: "fjkfsd",
    role: "users",
  },
  {
    id: 40,
    content: "fjkfsd",
    role: "user",
  },
  {
    id: 41,
    content: "fjkfsd",
    role: "users",
  },
  {
    id: 42,
    content: "fjkfsd",
    role: "user",
  },
  {
    id: 44,
    content: "fjkfsd",
    role: "users",
  },
  {
    id: 49,
    content:
      "fjkfsddskfljjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    role: "user",
  },
  {
    id: 60,
    content: "last",
    role: "assistant",
  },
];

export default function ChatUI({
  messages,
  isLoading,
  // currentChat,
}: {
  messages: Message[];
  isLoading: boolean;
  // currentChat: Message[];
}) {
  useEffect(() => {
    const scrollElm = document
      .getElementById("chat-list")
      
      scrollElm.scrollTo({ behavior: "smooth", top: scrollElm.scrollHeight, });
  }, [messages]);

  return (
    <div className="flex max-w-6/7 w-full h-full gap-3 items-center flex-col justify-end">
      <div
            id="chat-list"
      className="flex flex-col gap-4 p-3 overflow-scroll scrollbar-hidden w-full /h-full max-h-max">
        <div className="flex h-full">
          <div
            className="flex flex-col min-h-full justify-end/ w-full pt-20 pb-30 h-max gap-1"
          >
            {messages.map((message) => (
              <MessageElm key={message.id} message={message} />
            ))}
            <div className={`${isLoading ? "" : "hidden"} flex w-full`}>
              <div className="flex gap-1 p-3 rounded-full bg-white/5 rounded-bl-sm">
                <div className="p-0.5 animate-pulse delay-300 bg-white/35" />
                <div className="p-0.5 animate-pulse delay-600 bg-white/35" />
                <div className="p-0.5 animate-pulse delay-900 bg-white/35" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
