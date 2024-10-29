import { useRepairs } from "@/features/repairs/repairQueries";
import Repair from "./Repair";
import TableLoading from "./TableLoading";
import Alert from "../../components/ui/Alert";
import { RepairType } from "@/types/Repair";
import Pagination from "./Pagination";
import { useEffect } from "react";
import { useStore } from "@/store/store";
import { ArrowDown, ArrowUp } from "lucide-react";

const RepairList = () => {
  const { data, isLoading, isError, error } = useRepairs();
  const { setTotal, sortDate, setSortDate } = useStore();

  const handleSortChange = () => {
    setSortDate(sortDate === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    if (data) {
      setTotal(data.total);
    }
  }, [data]);

  if (isError) {
    return <Alert type="error" message={error.message} />;
  }

  if (isLoading) {
    return <TableLoading />;
  }

  return (
    <div className="card card-bordered mx-auto w-full max-w-screen-lg border-gray-700 bg-base-100 shadow">
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th>Device</th>
              <th>Assigned to</th>
              <th className="hidden lg:table-cell">Status</th>
              <th
                onClick={handleSortChange}
                className="hidden space-x-1 hover:cursor-pointer md:flex md:items-center"
              >
                Date created
                {sortDate === "asc" ? (
                  <ArrowUp className="ml-1 w-4 text-primary" />
                ) : (
                  <ArrowDown className="ml-1 w-4 text-primary" />
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.items.map((repair: RepairType) => (
              <Repair key={repair.id} repair={repair} />
            ))}
          </tbody>
        </table>
        <Pagination />
      </div>
    </div>
  );
};

export default RepairList;
