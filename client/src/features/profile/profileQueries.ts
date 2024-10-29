import { useQuery } from "@tanstack/react-query";
import { fetchUserProfile } from "./profileApi";

export function useFetchUserProfile(email: string) {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUserProfile(email),
  });
}
