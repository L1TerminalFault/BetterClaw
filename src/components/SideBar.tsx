"use client";

import { useState, useEffect } from "react";
import { usePathname, redirect } from "next/navigation";
import Link from "next/link";
import {
  TbLayoutSidebarLeftExpand,
  TbLayoutSidebarRightExpand,
} from "react-icons/tb";
import { MdOutlineDelete as Delete } from "react-icons/md";
import { FaPlus as Plus, FaCircleNotch } from "react-icons/fa6";
import { LuServer as RemoteIcon } from "react-icons/lu";
import { MdOutlineDevices as LocalIcon } from "react-icons/md";
import { useUser } from "@clerk/nextjs";

import { getLocalSessions, deleteSession } from "@/lib/utils";
import { useStore } from "@/lib/store";

export default function SideBar() {
  const [expanded, setExpanded] = useState<boolean>(true);
  // const [sessions, setSessions] = useState<Session[]>([]);
  const [updateSessions, setUpdateSessions] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [localSession, setLocalSession] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const pathname = usePathname();
  const { isSignedIn } = useUser();
  const { localSession, setLocalSession, sessions, setSessions } = useStore();

  const handleClick = async (id: string) => {
    redirect(`/chat/${id}`);
  };

  const handleDeleteSession = (id: string, e: any) => {
    e.stopPropagation();
    if (isSignedIn && !localSession) {
      deleteRemoteSession(id);
    } else {
      deleteSession(id);
      setUpdateSessions((prev) => !prev);
    }

    redirect("/chat/");
  };

  const getRemoteSessions = async () => {
    setLoading(true);
    try {
      const res = await (await fetch("/api/getRemoteSessions")).json();
      setSessions(res);
    } catch {
      setLocalSession(true);
    } finally {
      setLoading(false);
    }
  };

  const deleteRemoteSession = async (sessionId: string) => {
    setDeleting(true);

    try {
      await (await fetch(`/api/deleteRemoteSession?id=${sessionId}`)).json();
      setSessions(sessions.filter((session) => session.id !== sessionId));
    } catch {
    } finally {
      setDeleting(false);
    }
  };

  useEffect(() => {
    if (window.innerWidth < 1024)
      document.getElementById("expander-button")?.click();
  }, []);

  useEffect(() => {
    // INFO: To prevent cascading renders
    (() => {
      if (isSignedIn && !localSession) getRemoteSessions();
      else {
        setSessions(getLocalSessions());
        setLocalSession(true);
        setLoading(false);
      }
    })();

    const scrollElm = document.getElementById("scrollable");
    scrollElm?.scrollTo({ behavior: "smooth", top: 0 });
  }, [pathname, updateSessions, isSignedIn, localSession]);

  return (
    <div className="absolute pointer-events-none top-0 left-0 py-30 lg:px-5 px-3 h-full z-30 flex flex-col items-center">
      <div
        id="draggable"
        className={`flex flex-col rounded-3xl pointer-events-auto gap-3 ${expanded ? "min-h-100 max-h-300 w-75 p-4" : "translate-y-30 -translate-x-3 w-12 max-h-12 min-h-0 p-0"} bg-white/5 backdrop-blur-2xl shadow-lg shadow-black/30 transition-all duration-500 overflow-hidden`}
      >
        <div
          className={`flex items-center w-full justify-between text-white/60`}
        >
          <div
            className={`pl-3 flex items-center justify-between w-full pr-10 transition-all duration-1000 ${expanded ? "opacity-100" : "opacity-0"}`}
          >
            <div>
              Chats -{" "}
              <span className="text-xs text-white/40">
                {!localSession ? "Remote Database" : "Local"}
              </span>
            </div>
            <div
              onClick={() => setLocalSession(!localSession)}
              className="transition-colors hover:bg-white/5 -translate-y-1 rounded-full"
            >
              {!localSession ? (
                <LocalIcon
                  className="p-2 size-9"
                  //size={35}
                />
              ) : (
                <RemoteIcon
                  className="p-2 size-9"
                  //size={35}
                />
              )}
            </div>
          </div>

          <div
            id="expander-button"
            onClick={() => setExpanded((prev) => !prev)}
            className={`${expanded ? "right-3 top-3" : "right-1.5 top-1.5"} absolute transition-all hover:bg-white/5 rounded-full duration-300`}
          >
            {expanded ? (
              <TbLayoutSidebarRightExpand
                className="size-9 p-2"
                //size={3}
              />
            ) : (
              <TbLayoutSidebarLeftExpand
                className="size-9 p-2"
                //size={35}
              />
            )}
          </div>
        </div>

        <div
          id="scrollable"
          className={`flex flex-col-reverse pb-1 gap-0 ${expanded ? "opacity-100" : "opacity-0"} transition-all duration-500 scrollbar-custom overflow-y-auto w-full h-full`}
        >
          {loading ? (
            <div className="py-14 h-full w-full text-white/50 flex justify-center">
              <FaCircleNotch className="text-white/30 animate-spin size-5" />
            </div>
          ) : !sessions.length ? (
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
                <div className="relative overflow-scroll w-full text-nowrap scrollbar-hidden pr-2">
                  {/* <div className="absolute right-0 h-full bg-linear-to-r from-transparent bg-white/5 p-3" /> */}
                  {session.title}
                </div>
                <div className="relative group-hover:opacity-100 opacity-0 p-2 transition-all rounded-full hover:bg-white/5">
                  {deleting ? (
                    <FaCircleNotch className="size-5 text-white/60 animate-spin" />
                  ) : (
                    <Delete
                      onClick={(e) => handleDeleteSession(session.id, e)}
                      className="size-5 text-white/60"
                    />
                  )}
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
            <Plus className="size-5" />
          </div>
        </Link>
      </div>
    </div>
  );
}
