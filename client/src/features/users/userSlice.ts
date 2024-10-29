import { StateCreator } from "zustand";

type UserState = {
  searchUser: string;
};

type UserActions = {
  setSearchUser: (searchUser: string) => void;
};

export type UserSlice = UserState & UserActions;

const initialState: UserState = {
  searchUser: "",
};

export const createUserSlice: StateCreator<UserSlice, [], [], UserSlice> = (
  set,
) => ({
  ...initialState,
  setSearchUser: (searchUser) => set({ searchUser }),
});
