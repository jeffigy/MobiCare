import { createAuthSlice } from "@/features/auth/authSlice";
import { createRepairSlice } from "@/features/repairs/repairSlice";
import { createUserSlice } from "@/features/users/userSlice";
import { Store } from "@/types/store";
import { create } from "zustand";
import { devtools, subscribeWithSelector } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useStore = create<Store>()(
  devtools(
    subscribeWithSelector(
      immer((...a) => ({
        ...createAuthSlice(...a),
        ...createRepairSlice(...a),
        ...createUserSlice(...a),
      })),
    ),
  ),
);
