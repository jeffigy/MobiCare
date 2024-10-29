import { CircleEllipsis, CircleFadingArrowUp } from "lucide-react";
import { useRepairs } from "./repairQueries";

const Stats = () => {
  const { data, isLoading } = useRepairs();

  const pendingRepairs = data?.items.filter(
    (repair) => repair.status === "pending",
  ).length;

  const inProgressRepairs = data?.items.filter(
    (repair) => repair.status === "in progress",
  ).length;

  if (isLoading) {
    return <StatsLoading />;
  }
  return (
    <div className="mx-auto flex w-full max-w-screen-md flex-col space-y-5 sm:flex-row sm:space-x-5 sm:space-y-0">
      <div className="stats w-full shadow">
        <div className="stat">
          <div className="stat-figure text-primary">
            <CircleEllipsis className="h-8 w-8 text-warning" />
          </div>
          <div className="stat-title">Pending Repairs</div>
          <div className="stat-value">{pendingRepairs}</div>
        </div>
      </div>
      <div className="stats w-full shadow">
        <div className="stat">
          <div className="stat-figure text-primary">
            <CircleFadingArrowUp className="h-8 w-8" />
          </div>
          <div className="stat-title">In Progress Repairs</div>
          <div className="stat-value">{inProgressRepairs}</div>
        </div>
      </div>
    </div>
  );
};

const StatsLoading = () => {
  return (
    <div className="mx-auto flex w-full max-w-screen-md flex-col space-y-5 sm:flex-row sm:space-x-5 sm:space-y-0">
      <div className="stats w-full shadow">
        <div className="stat">
          <div className="stat-figure text-primary">
            <CircleEllipsis className="h-8 w-8 text-warning" />
          </div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton mt-2 h-9 w-full"></div>
        </div>
      </div>
      <div className="stats w-full shadow">
        <div className="stat">
          <div className="stat-figure text-primary">
            <CircleFadingArrowUp className="h-8 w-8" />
          </div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton mt-2 h-9 w-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
