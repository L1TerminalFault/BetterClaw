"use client";

import { useState, useEffect } from "react";
import { usePathname, redirect } from "next/navigation";
import Link from "next/link";
import {
  TbLayoutSidebarLeftExpand,
  TbLayoutSidebarRightExpand,
} from "react-icons/tb";
import { TbDots } from "react-icons/tb";
import { FaPlus } from "react-icons/fa";

import { getLocalSessions } from "@/lib/utils";
import { Session } from "@/lib/types";

export default function SideBar() {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [sessions, setSessions] = useState<Session[]>([]);
  const pathname = usePathname();

  const handleClick = async (id: string) => {
    redirect(`/chat/${id}`);
  };

  useEffect(() => {
    setSessions(getLocalSessions());

    if (window.innerWidth < 1024)
      document.getElementById("expander-button")?.click();
  }, [pathname]);

  return (
    <div className="absolute pointer-events-none top-0 left-0 py-30 lg:px-5 px-3 h-full z-30 flex flex-col items-center">
      <div
        className={`flex flex-col rounded-3xl pointer-events-auto gap-3 ${expanded ? "min-h-100 max-h-300 w-75 p-4" : "-translate-x-4 w-15 max-h-15 min-h-0 p-2"} bg-white/3 backdrop-blur-2xl shadow-lg shadow-black/30 transition-all duration-500 overflow-hidden`}
      >
        <div
          className={`flex items-center w-full justify-between text-white/60`}
        >
          <div
            className={`pl-3 transition-all duration-1000 ${expanded ? "opacity-100" : "opacity-0"}`}
          >
            Chats
          </div>

          <div
            id="expander-button"
            onClick={() => setExpanded((prev) => !prev)}
            className="absolute right-3 top-3"
          >
            {expanded ? (
              <TbLayoutSidebarRightExpand
                className="rounded-full transition-colors hover:bg-white/5 size-5 p-2"
                size={33}
              />
            ) : (
              <TbLayoutSidebarLeftExpand
                className="rounded-full transition-colors size-5 hover:bg-white/5 p-2"
                size={33}
              />
            )}
          </div>
        </div>

        <div
          className={`flex flex-col-reverse pb-1 gap-0 ${expanded ? "opacity-100" : "opacity-0"} transition-all duration-500 scrollbar-hidden overflow-scroll w-full h-full`}
        >
          {!sessions.length ? (
            <div className="py-9 w-full text-white/50 flex justify-center">
              No chats
            </div>
          ) : (
            sessions.map((session) => (
              <div
                onClick={() => handleClick(session.id)}
                key={session.id}
                className={`${pathname.includes(session.id) ? "bg-white/8" : ""} hover:bg-white/5 group pl-4 pr-1 py-1 gap-2 flex items-center justify-between rounded-2xl transition-colors`}
              >
                <div className="overflow-scroll text-nowrap scrollbar-hidden pr-2">
                  {session.title}
                </div>
                <div className="group-hover:opacity-100 opacity-0 p-2 transition-colors rounded-full hover:bg-white/5">
                  <TbDots className="size-5" />
                </div>
              </div>
            ))
          )}
        </div>

        <Link
          href="/chat"
          className={`w-full pl-3 text-white/60 flex ${expanded ? "opacity-100" : "opacity-0"} transition-all duration-600 items-center justify-between`}
        >
          New chat{" "}
          <div className="p-2 transition-colors rounded-full hover:bg-white/5">
            <FaPlus className="size-5" />
          </div>
        </Link>
      </div>
    </div>
  );
}
