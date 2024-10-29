import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchRepairs } from "../repairs/repairApi";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    async function prefetch() {
      await queryClient.prefetchQuery({
        queryKey: ["repairs"],
        queryFn: () => fetchRepairs({}),
      });
    }
    prefetch();
  }, []);

  return <Outlet />;
};

export default Prefetch;
