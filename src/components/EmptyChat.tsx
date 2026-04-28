"use client";

import { useState, useEffect, FormEvent } from "react";
import { redirect } from "next/navigation";
import { LuSendHorizontal as SendIcon } from "react-icons/lu";
import { FaCircleNotch } from "react-icons/fa";
import { useUser } from "@clerk/nextjs";

import { createNewLocalSession } from "@/lib/utils";
import { listOfStarterPrompts, getRandomGreeting } from "@/lib/gen-utils";
import { StarterPrompt } from "@/lib/types";
import { useStore } from "@/lib/store";

// const currentGreeting = getRandomGreeting()

export default function EmptyChat() {
  const [textInput, setTextInput] = useState("");
  const [currentGreeting, setCurrentGreeting] = useState("");
  const [loading, setLoading] = useState(false);
  const { localSession, setInitChat } = useStore();
  const { user } = useUser();

  const addNewSession = async (e: FormEvent<HTMLFormElement> | string) => {
    if (typeof e !== "string") e.preventDefault();

    const newSessionId = createNewLocalSession(
      typeof e === "string" ? e : textInput,
    );

    setInitChat(typeof e === "string" ? e : textInput);

    redirect(
      `/chat/${newSessionId}`,
    );
  };

  const addNewRemoteSession = async (
    e: FormEvent<HTMLFormElement> | string,
  ) => {
    if (typeof e !== "string") e.preventDefault();
    if (!user?.id) return;
    setLoading(true);
    const id = crypto.randomUUID().toString();
    const newSession = {
      id,
      title: typeof e === "string" ? e : textInput,
      createdAt: null,
      clerkId: user?.id,
    };

    try {
      const res = await (
        await fetch("/api/addRemoteSession", {
          method: "POST",
          body: JSON.stringify(newSession),
        })
      ).json();

      setInitChat(typeof e === "string" ? e : textInput);

      redirect(
        `/chat/${id}`,
      );
      console.log(res)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  };

  const selectButton = (elm: StarterPrompt) => {
    setTextInput(elm.prompt);
    if (localSession) addNewSession(elm.prompt);
    else addNewRemoteSession(elm.prompt);
  };

  useEffect(() => {
    document.getElementById("input")?.focus();
    (() => setCurrentGreeting(getRandomGreeting()))();
  }, []);

  return (
    <div className="flex flex-col gap-10 w-full h-full items-center justify-center">
      {loading ? (
        <div>
          <FaCircleNotch className="size-10 animate-spin" />
        </div>
      ) : (
        <div className="flex flex-col gap-10 /max-lg:-translate-y-20 items-center justify-center pb-20">
          <div className="md:p-8 lg:text-5xl text-3xl text-center flex justify-center">
            {currentGreeting}
          </div>

          <div className="flex md:flex-col items-center max-md:flex-col-reverse gap-10">
            <div className="md:max-w-3/5 gap-3 flex justify-center flex-wrap">
              {listOfStarterPrompts.map((elm) => (
                <div
                  key={elm.id}
                  onClick={() => selectButton(elm)}
                  className="px-5 py-2 flex gap-3 items-center max-lg:text-xs border border-white/5 shadow-md transition-colors shadow-black/40 hover:bg-white/10 bg-white/5 rounded-full"
                >
                  <elm.icon />
                  {elm.title}
                </div>
              ))}
            </div>

            <div className="flex bg-white/5 w-3/5 focus-within:border-white/10 /focus-within:[box-shadow:0_0_20px_5px_rgba(234,88,12,0.1)] hover:border-white/6 transition-all focus-within:scale-102 border border-transparent max-w-450 max-md:min-w-120 max-sm:min-w-full rounded-full shadow-lg shadow-black/30 backdrop-blur-2xl">
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
        </div>
      )}
    </div>
  );
}
