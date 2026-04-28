import { create } from "zustand";

export const useStore = create(
  (
    set,
  ): {
    localSession: boolean;
    setLocalSession: (localstate: boolean) => void;
  } => ({
    localSession: false,
    setLocalSession: (localstate: boolean) =>
      set(() => ({ localSession: localstate })),
  }),
);
