"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { FaCircleNotch } from "react-icons/fa";
import { GiCrabClaw } from "react-icons/gi";

import { isFirstTimeUsage, setNotFirstTime } from "@/lib/utils";

export default function Onboard() {
  const [loading, setLoading] = useState(true);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!isFirstTimeUsage()) redirect("/chat");
    else setNotFirstTime();
    setLoading(false);
    if (!loading) setAnimate(true)
  }, [loading]);

  return (
    <div className="flex w-full h-full p-10 items-center justify-center">
      {loading ? (
        <FaCircleNotch className="animate-spin size-10 text-gray-300" />
      ) : (
        <div className={`${animate ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"} duration-500 flex lg:p-15 max-lg:flex-col w-full max-w-350 p-10 gap-10 items-center justify-center border-1 bg-white/3 rounded-4xl border-white/6 shadow-lg shadow-black/30`}>
          <div className="flex flex-col w-full gap-4">
            <div className="flex gap-5 items-center">
              <GiCrabClaw className={`lg:size-20 size-15 text-orange-600 transition-all`} />

              <div className="flex lg:text-5xl text-4xl text-gray-400">
                Better<span className="text-orange-600">Claw</span>
              </div>

              <div className="p-3 hidden rounded-full blur-[2px] bg-orange-500"></div>
            </div>

            <div className="p-5 gap-2 flex flex-col">
	      <div className="text-gray-300 text-lg">A better UI interface for casual use of AI, using the OpenRouter api</div>
	      <div className="text-gray-400">BetterClaw provides a better user experience inspired by OpenClaw theme, <br />your chats are locally stored </div>
            </div>

            <div className="flex gap-3">
              <Link
                href="/chat"
                className="px-5 py-3 rounded-full border-1 border-gray-600 bg-orange-700 transition-colors hover:bg-orange-800"
              >
                Start a Chat
              </Link>

              <div></div>
            </div>
          </div>

          <div className="min-w-1/3 p-2 pt-15 pb-4 bg-black/50 flex flex-1 w-full h-full rounded-3xl">
	    <div className="flex flex-col w-full h-full gap-2">
	      <div className="w-full flex flex-col items-end gap-1">
	        <div className="bg-white/5 px-4 py-2 mr-3 rounded-full rounded-br-sm">Hey, How you doin'</div>
		<div className="p-2 bg-white/4 mr-1 rounded-full"></div>
		<div className="p-1 bg-white/3 rounded-full"></div>
	      </div>
	      
	      <div className="w-full flex flex-col items-start gap-1">
	        <div className="bg-orange-300/5 px-4 py-2 rounded-full ml-3 rounded-bl-sm">How can I help with</div>
		<div className="p-2 bg-orange-400/4 ml-1 rounded-full"></div>
		<div className="p-1 bg-orange-500/3 rounded-full"></div>
	      </div>

	      <div className="w-full text-white/40 bg-white/5 shadow-md shadow-black/40 p-4 px-6 rounded-full">
	        Say something
	      </div>
	    </div>
	  </div>
        </div>
      )}
    </div>
  );
}
