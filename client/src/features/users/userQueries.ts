import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "./userApi";
import { useStore } from "@/store/store";

export function useFetchUsers(email: string) {
  const { searchUser } = useStore();
  return useQuery({
    queryKey: ["users", { search: searchUser }],
    queryFn: () => fetchUsers({ email, search: searchUser }),
    refetchInterval: 30000,
  });
}
