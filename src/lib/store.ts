import { create } from "zustand";

import { Session } from "@/lib/types";

export const useStore = create(
  (
    set,
  ): {
    localSession: boolean;
    sessions: Session[];
    setLocalSession: (localstate: boolean) => void;
    setSessions: (sessions_: Session[]) => void;
  } => ({
    localSession: false,
    sessions: [],
    setSessions: (sessions_: Session[]) => set(() => ({ sessions: sessions_ })),
    setLocalSession: (localstate: boolean) =>
      set(() => ({ localSession: localstate })),
  }),
);
