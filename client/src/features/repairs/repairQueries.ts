import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchRepairs } from "./repairApi";
import { useStore } from "@/store/store";

export function useRepairs() {
  const { page, limit, search, sortDate, status } = useStore();
  return useQuery({
    queryKey: ["repairs", { page, limit, search, sortDate, status }],
    queryFn: () => fetchRepairs({ page, limit, search, sortDate, status }),
    refetchInterval: 30000,
    placeholderData: keepPreviousData,
  });
}
