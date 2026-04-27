"use client";

import { Message } from "ai";

import { Session } from "./types";

export const getLocalSessions = (): Session[] => {
  const localSessions = window.localStorage.getItem("__betterclaw_sessions__");
  return localSessions ? JSON.parse(localSessions) : [];
};

export const setLocalSessions = (sessions: Session[]) => {
  window.localStorage.setItem(
    "__betterclaw_sessions__",
    JSON.stringify(sessions),
  );
};

export const getSession = (id: string): Session | undefined => {
  const allSessions = getLocalSessions();
  return allSessions.find((session) => session.id === id);
};

export const createNewLocalSession = (title?: string): string => {
  // const id = randomUUID().toString();
  const id = crypto.randomUUID().toString();
  const newSession: Session = {
    id,
    createdAt: Date.now(),
    title: title || "New Chat",
    messages: [],
  };
  const previousSessions = getLocalSessions();
  previousSessions.push(newSession);

  setLocalSessions(previousSessions);

  return id;
};

export const updateSession = (newSession: Session) => {
  const updatedSessions = getLocalSessions().map((session) =>
    session.id === newSession.id ? newSession : session,
  );
  setLocalSessions(updatedSessions);
};

export const addMessagestoLocalSession = (id: string, messages: Message[]) => {
  const currentSession = getSession(id);
  if (!currentSession) return;

  currentSession.messages.push(...messages);
  updateSession(currentSession);
};

export const deleteSession = (id: string) => {
  const sessions = getLocalSessions().filter((session) => session.id !== id);
  setLocalSessions(sessions);
};

export const isFirstTimeUsage = () => {
  return localStorage.getItem("__betterclaw_not_first_time__") ? false : true;
};

export const setNotFirstTime = () => {
  localStorage.setItem("__betterclaw_not_first_time__", JSON.stringify(""));
};
