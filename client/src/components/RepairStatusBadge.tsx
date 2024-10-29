const RepairStatusBadge = ({ status }: { status: string }) => {
  if (status === "pending") {
    return <div className="badge badge-warning badge-outline">Pending</div>;
  }

  if (status === "in progress") {
    return <div className="badge badge-info badge-outline">In Progress</div>;
  }

  if (status === "cancelled") {
    return <div className="badge badge-error badge-outline">Cancelled</div>;
  }

  return <div className="badge badge-success badge-outline">Completed</div>;
};

export default RepairStatusBadge;
