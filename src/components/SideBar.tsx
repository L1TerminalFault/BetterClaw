"use client";

import { useState, useEffect } from "react";
import { usePathname, redirect } from "next/navigation";
import Link from "next/link";
import {
  TbLayoutSidebarLeftExpand,
  TbLayoutSidebarRightExpand,
} from "react-icons/tb";
import { MdOutlineDelete as Delete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

import { getLocalSessions, deleteSession } from "@/lib/utils";
import { Session } from "@/lib/types";

export default function SideBar() {
  const [expanded, setExpanded] = useState<boolean>(true);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [updateSessions, setUpdateSessions] = useState(false);
  const pathname = usePathname();

  const handleClick = async (id: string) => {
    redirect(`/chat/${id}`);
  };

  const handleDeleteSession = (id: string, e: any) => {
    e.stopPropagation();
    deleteSession(id);
    setUpdateSessions(prev => !prev);
    redirect("/chat/")
  }

  useEffect(() => {
    setSessions(getLocalSessions());

    if (window.innerWidth < 1024)
      document.getElementById("expander-button")?.click();
  }, [pathname, updateSessions]);

  return (
    <div className="absolute pointer-events-none top-0 left-0 py-30 lg:px-5 px-3 h-full z-30 flex flex-col items-center">
      <div
        id="draggable"
        className={`flex flex-col rounded-3xl pointer-events-auto gap-3 ${expanded ? "min-h-100 max-h-300 w-75 p-4" : "translate-y-30 -translate-x-3 w-13 max-h-13 min-h-0 p-0"} bg-white/5 backdrop-blur-2xl shadow-lg shadow-black/30 transition-all duration-500 overflow-hidden`}
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
            className={`${expanded ? "right-3 top-3" : "right-1.5 top-1.5"} absolute transition-all duration-300`}
          >
            {expanded ? (
              <TbLayoutSidebarRightExpand
                className="rounded-full transition-colors hover:bg-white/5 /size-5 p-2"
                size={35}
              />
            ) : (
              <TbLayoutSidebarLeftExpand
                className="rounded-full transition-colors /size-5 hover:bg-white/5 p-2"
                size={35}
              />
            )}
          </div>
        </div>

        <div
          className={`flex flex-col-reverse pb-1 gap-0 ${expanded ? "opacity-100" : "opacity-0"} transition-all duration-500 scrollbar-custom overflow-y-auto w-full h-full`}
        >
          {!sessions.length ? (
            <div className="py-14 h-full w-full text-white/50 flex justify-center">
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
                <div className="relative group-hover:opacity-100 opacity-0 p-2 transition-all rounded-full hover:bg-white/5">
                  <Delete onClick={(e) => handleDeleteSession(session.id, e)} className="size-5 text-white/60" />
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
