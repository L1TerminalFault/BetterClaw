import { create } from "zustand";

import { Session } from "@/lib/types";

export const useStore = create(
  (
    set,
  ): {
    localSession: boolean;
    sessions: Session[];
    initChat: string | null;
    setInitChat: (chat: string) => void;
    setLocalSession: (localstate: boolean) => void;
    setSessions: (sessions_: Session[]) => void;
  } => ({
    localSession: true,
    sessions: [],
    initChat: null,
    setInitChat: (chat: string) => set(() => ({ initChat: chat })),
    setSessions: (sessions_: Session[]) => set(() => ({ sessions: sessions_ })),
    setLocalSession: (localstate: boolean) =>
      set(() => ({ localSession: localstate })),
  }),
);
