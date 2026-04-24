"use client";

import { GiCrabClaw as Icon } from "react-icons/gi";
import { useState, useEffect } from "react";
import {Show, SignInButton, UserButton} from "@clerk/nextjs"

export default function TopBar() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true)
  }, []);

  return (
    <div className="fixed z-10 w-full top-0 z-40 p-6 left-0 flex justify-center">
      <div
        className={`flex w-full items-center justify-between backdrop-blur-2xl bg-white/8 max-w-480 rounded-full shadow-lg shadow-black/30 p-2`}
      >
        <div
          className={`flex gap-3 ${animate ? "max-w-50" : "max-w-0"} duration-2500 delay-1000 transition-all duration-700 overflow-hidden items-center p-1 px-6`}
        >
          <div className="flex gap-3 items-center">
            <Icon
              className={`text-orange-600 ${animate ? "scale-100" : "scale-0"} duration-300 delay-100 transition-transform duration-500 size-5`}
            />
            <div className="text-lg  text-gray-400 ">
              Better<span className="text-orange-500">Claw</span>
            </div>
          </div>
          <div className="bg-orange-500 rounded-full blur-[1px] animate-pulse p-1"></div>
        </div>

	{/* <Show when="signed-out">
	<SignInButton mode="modal">
        <div className="rounded-full px-6 py-2 bg-orange-600/90 transition-colors hover:bg-orange-500/50">
          Log in
        </div>
	</SignInButton>
	</Show>

            <Show when="signed-in">
	    <div className="px-2">
              <UserButton
                showName
                appearance={{
                  elements: {
                    userButtonOuterIdentifier: {
                      color: "gray",
                    },
                  },
                }}
              />
	      </div>
            </Show> */}
      </div>
    </div>
  );
}
