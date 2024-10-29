import EditRepairForm from "@/features/repairs/edit/EditRepairForm";
import Alert from "@/components/ui/Alert";
import { useRepairs } from "@/features/repairs/repairQueries";
import { useParams } from "react-router-dom";
import { useFetchUsers } from "@/features/users/userQueries";

const EditRepairPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useRepairs();
  const {
    data: users,
    isLoading: usersIsLoading,
    isError: usersIsError,
    error: usersError,
  } = useFetchUsers("");
  const repair = data?.items.find((repair) => repair.id === id);

  if (isLoading || usersIsLoading) {
    return (
      <div className="skeleton mx-auto h-[1173px] w-full max-w-screen-sm"></div>
    );
  }

  if (isError || usersIsError)
    return (
      <Alert message={error?.message ?? usersError?.message} type="error" />
    );

  if (!repair) return <Alert message={"Repair not found"} type="error" />;
  if (!users) return <Alert message={"Users not found"} type="error" />;

  return <EditRepairForm users={users} repair={repair} />;
};

export default EditRepairPage;
