import { AuthSlice } from "@/features/auth/authSlice";
import { RepairSlice } from "@/features/repairs/repairSlice";
import { UserSlice } from "@/features/users/userSlice";

export type Store = AuthSlice & RepairSlice & UserSlice;
