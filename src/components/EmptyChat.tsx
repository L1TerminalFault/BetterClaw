"use client";

import { useState, useEffect, FormEvent } from "react";
import { redirect } from "next/navigation";
import { LuSendHorizontal as SendIcon } from "react-icons/lu";

import { createNewLocalSession } from "@/lib/utils";
import { listOfStarterPrompts, getRandomGreeting } from "@/lib/gen-utils";
import { StarterPrompt } from "@/lib/types";

const currentGreeting = getRandomGreeting()

export default function EmptyChat() {
  const [textInput, setTextInput] = useState("");

  const addNewSession = async (e: FormEvent<HTMLFormElement> | string) => {
    if (typeof e !== "string") e.preventDefault()

    const newSessionId = createNewLocalSession(typeof e === "string" ? e : textInput);

    redirect(`/chat/${newSessionId}?init-chat=${typeof e === "string" ? e : textInput}`);
  };

  const selectButton = (elm: StarterPrompt) => {
    setTextInput(elm.prompt);
    addNewSession(elm.prompt)
  };

  useEffect(() => {
    // TODO: Add a new session then redirect to it
    document.getElementById("input")?.focus()
  }, [])

  return (
    <div className="flex flex-col gap-10 w-full h-full items-center justify-center">
      <div className="p-8 -translate-y-10 text-5xl">{currentGreeting}</div>

      <div className="flex max-w-3/5 gap-3 justify-center flex-wrap">
        {listOfStarterPrompts.map((elm) => (
          <div
            key={elm.id}
            onClick={() => selectButton(elm)}
            className="px-5 py-2 max-w-[85%] border border-white/5 shadow-md transition-colors shadow-black/40 hover:bg-white/10 bg-white/5 rounded-full"
          >
            {elm.title}
          </div>
        ))}
      </div>

      <div className="flex bg-white/5 w-3/5 focus-within:border-white/10 hover:border-white/6 transition-all focus-within:scale-102 border border-transparent max-w-450 rounded-full shadow-lg shadow-black/70 backdrop-blur-2xl">
        <form onSubmit={addNewSession} className="w-full flex">
          <input
            id="input"
            type="text"
            value={textInput}
            placeholder="Say something"
            onChange={(e) => setTextInput(e.target.value)}
            className="p-4 px-6 outline-none w-full"
          />
          <button
            id="submit-button"
            type="submit"
            disabled={!textInput}
            className="p-2.5"
          >
            <SendIcon
              className={`p-2.5 rounded-full ${textInput ? "hover:bg-orange-700" : ""} ${textInput ? "bg-orange-600 text-white/75" : "text-white/25"} transition-all`}
              size={35}
            />
          </button>
        </form>
      </div>
    </div>
  );
}
