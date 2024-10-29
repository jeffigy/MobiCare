import { UserType } from "@/types/user";
import { StateCreator } from "zustand";

type AuthState = {
  token: string | null;
  user: UserType | null;
};

type ActionType = {
  setCredentials: (token: string) => void;
  clearCredentials: () => void;
  setUser: (user: UserType) => void;
};

export type AuthSlice = AuthState & ActionType;

const initialState: AuthState = {
  token: null,
  user: null,
};

export const createAuthSlice: StateCreator<
  AuthSlice,
  [["zustand/immer", never]],
  [],
  AuthSlice
> = (set) => ({
  ...initialState,
  setCredentials: (token) =>
    set({
      token,
    }),
  setUser: (user) => set({ user }),
  clearCredentials: () =>
    set({
      token: null,
      user: null,
    }),
});
