import { StateCreator } from "zustand";

type RepairState = {
  page: number;
  limit: number;
  total: number;
  search: string;
  sortDate: "asc" | "desc";
  status: string[];
};

type RepairActions = {
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setTotal: (total: number) => void;
  setSearch: (search: string) => void;
  setSortDate: (sortDate: "asc" | "desc") => void;
  setStatus: (statusUpdater: (prev: string[]) => string[]) => void;
};

export type RepairSlice = RepairState & RepairActions;

const initialState: RepairState = {
  page: 1,
  limit: 10,
  total: 0,
  search: "",
  sortDate: "desc",
  status: [],
};

export const createRepairSlice: StateCreator<
  RepairSlice,
  [["zustand/immer", never]],
  [],
  RepairSlice
> = (set) => ({
  ...initialState,
  setPage: (page) => set({ page }),
  setLimit: (limit) => set({ limit }),
  setTotal: (total) => set({ total }),
  setSearch: (search) => set({ search }),
  setSortDate: (sortDate) => set({ sortDate }),
  setStatus: (statusUpdater) =>
    set((state) => ({ status: statusUpdater(state.status) })),
});
