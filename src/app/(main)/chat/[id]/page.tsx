"use client";

import { useChat } from "ai/react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { redirect } from "next/navigation";
import { FaCircleNotch } from "react-icons/fa";
import { Message } from "ai";
import { useUser } from "@clerk/nextjs";

import ChatUI from "@/components/ChatUI";
import InputBar from "@/components/InputBar";
import { RemoteMessage } from "@/lib/types";
import { getSession, addMessagestoLocalSession } from "@/lib/utils";
import { useStore } from "@/lib/store";

export default function ChatEach() {
  const [loading, setLoading] = useState(true);
  const [error] = useState<string | null>(null);
  const [initChat, setInitChat] = useState(false);
  const [initialMessages, setInitialMessages] = useState<Message[]>([]);

  const { user, isSignedIn } = useUser();
  const { localSession, sessions, initChat: initText, setInitChat: setInitText } = useStore();
  const { id } = useParams();
  const idStr = id?.toString();

  const {
    input,
    setInput,
    handleSubmit,
    handleInputChange,
    messages,
    isLoading,
  } = useChat({
    initialMessages,
    onFinish: (message) => {
      if (!idStr || !user?.id) return;

      if (localSession) addMessagestoLocalSession(idStr, [message]);
      else {
        addMessagesToRemoteSession(
          [{ ...message, sessionId: idStr, clerkId: user.id }],
          idStr,
        );
      }
    },
  });

  const addMessagesToRemoteSession = useCallback(
    async (messages: RemoteMessage[], sessionId?: string) => {
      if (!idStr) return;

      try {
        await (
          await fetch(`/api/addMessagesToRemoteSession`, {
            method: "POST",
            body: JSON.stringify({
              sessionId,
              messages,
            }),
          })
        ).json();
      } catch {
      } finally {
      }
    },
    [idStr],
  );

  useEffect(() => {
    if (!idStr) redirect(`/chat`);

    (() => {
      if (initText) {
        setInput(initText);
        setInitChat(true);
      }
    })();

    if (messages.length && messages[messages.length - 1].role === "user")
      if (localSession)
        addMessagestoLocalSession(idStr, [messages[messages.length - 1]]);
      else {
        if (!user?.id) return;
        addMessagesToRemoteSession(
          messages.map(({ id, role, content, createdAt }) => ({
            id,
            role,
            content,
            createdAt: new Date(createdAt || Date.now()),
            sessionId: idStr,
            clerkId: user.id,
          })),
          idStr,
        );
      }

      return () => setInitText(null);
  }, [setInput]);

  // useEffect(() => {
  //   console.log(initialMessages);
  // }, [initialMessages]);

  // useEffect(() => {
  //   // if (!user?.id) return;
  //   if (!isSignedIn || !user?.id || !idStr || localSession) return;
  // }, [
  //   messages,
  //   idStr,
  //   user?.id,
  //   isSignedIn,
  //   localSession,
  //   addMessagesToRemoteSession,
  // ]);

  useEffect(() => {
    if (!idStr) redirect(`/chat`);

    if (localSession) {
      const currentChat = getSession(idStr)?.messages;
      if (!currentChat) redirect(`/chat`);

      if (!currentChat?.length) return (() => setLoading(false))();

      (() => setInitialMessages(currentChat))();
      return (() => setLoading(false))();
    } else {
      const currentSession = sessions.find((session) => session.id === idStr);
      if (!currentSession) return redirect("/chat");
      (() => setInitialMessages(currentSession?.messages))();
      return (() => setLoading(false))();
    }
  }, [id, localSession, idStr, sessions]);

  return (
    <div className="flex w-full h-full items-center justify-center">
      {loading ? (
        <div>
          <FaCircleNotch className="size-10 animate-spin" />
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
          <div className="flex flex-col p-3 overflow-scroll scrollbar-hidden max-w-6xl w-full h-full items-center justify-center">
            <ChatUI
              messages={messages}
              isLoading={isLoading}
            />
          </div>
          <InputBar
            input={input}
            initChat={initChat}
            handleSubmitAction={handleSubmit}
            handleInputChangeAction={handleInputChange}
          />
        </>
      )}
    </div>
  );
}
