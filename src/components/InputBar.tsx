"use client";

import { ChatRequestOptions } from "ai";
import { useEffect, ChangeEvent, FormEvent } from "react";
import { LuSendHorizontal } from "react-icons/lu";

export default function InputBar({
  handleSubmitAction,
  input,
  initChat,
  handleInputChangeAction,
}: {
  handleSubmitAction: (
    e: FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions | undefined,
  ) => void;
  input: string;
  initChat: boolean;
  handleInputChangeAction: (
    e:
      | ChangeEvent<HTMLInputElement, Element>
      | ChangeEvent<HTMLTextAreaElement, Element>,
  ) => void;
}) {
  useEffect(() => {
    if (initChat && input) document.getElementById("submit-init-input")?.click()
  }, [])

  return (
    <div className="absolute bottom-0 left-0 w-full px-10 pb-10 flex items-center justify-center">
      <div className="flex w-full h-full bg-white/5 focus-within:border-white/10 hover:border-white/6 transition-all focus-within:scale-102 border border-transparent max-w-360 rounded-full shadow-lg shadow-black/70 backdrop-blur-2xl">
        <form onSubmit={handleSubmitAction} className="w-full flex">
          <input
            type="text"
            value={input}
            placeholder="Say something"
            onChange={handleInputChangeAction}
            className="p-5 px-7 outline-none w-full"
          />
          <button id="submit-init-input" type="submit" disabled={!input} className="p-2.5">
            <LuSendHorizontal
              className={`p-2.5 rounded-full ${input ? "hover:bg-orange-700" : ""} ${input ? "bg-orange-600 text-white/75" : "text-white/25"} transition-all`}
              size={35}
            />
          </button>
        </form>
      </div>
    </div>
  );
}
