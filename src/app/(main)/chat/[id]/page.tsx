"use client";

import { useChat } from "ai/react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { FaCircleNotch } from "react-icons/fa";
// import { Message } from "ai";

import ChatUI from "@/components/ChatUI";
import InputBar from "@/components/InputBar";
// import { Session } from "@/lib/types";
import { getSession, addMessagestoLocalSession } from "@/lib/utils";

export default function ChatEach() {
  const { id } = useParams();
  const params = useSearchParams();
  // const [chatList, setChatList] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [initChat, setInitChat] = useState(false)
  const { input, setInput, handleSubmit, handleInputChange, messages, isLoading } =
    useChat();

  const feedContextToModel = async () => {
    setLoading(true);
    try {
      // TODO: Handle feeding the context to the model through api call
      // BUG: Assuming that giving context to the model will fill 'messages' state with the previous messages
    } catch (err) {
      setError(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initChat = params.get("init-chat")
    if (initChat) {
      setInput(initChat) 
      setInitChat(true)
    }
  }, [])

  useEffect(() => {
    addMessagestoLocalSession(id as string, [messages[-1]]);
    // console.log(messages);
  }, [messages, id]);

  useEffect(() => {
    const idStr = id?.toString();
    if (!idStr) redirect(`/chat`);

    const currentChat = getSession(idStr)?.messages;
    if (!currentChat) redirect(`/chat`);

    if (!currentChat.length) return setLoading(false);

    // TODO: Figure out the param
    feedContextToModel();
    return;
  }, [id]);

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
          <div className="flex flex-col p-3 overflow-scroll scrollbar-hidden max-w-7xl w-full h-full items-center justify-center">
            <ChatUI
              /* currentChat={chatList} */
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
