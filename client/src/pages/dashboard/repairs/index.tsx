import Fab from "@/components/ui/Fab";
import RepairList from "@/features/repairs/RepairList";
import SearchFilter from "@/features/repairs/SearchFilter";
import Stats from "@/features/repairs/Stats";
import useAuth from "@/hooks/useAuth";
import { PlusIcon } from "lucide-react";

const Repairs = () => {
  const { isAdmin } = useAuth();
  return (
    <>
      <Stats />
      <SearchFilter />
      <RepairList />
      {isAdmin && (
        <Fab href="/repairs/new" icon={<PlusIcon className="h-6 w-6" />} />
      )}
    </>
  );
};

export default Repairs;
