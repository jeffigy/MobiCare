import Alert from "@/components/ui/Alert";
import CreateRepairForm from "@/features/repairs/create/CreateRepairForm";
import { useFetchUsers } from "@/features/users/userQueries";
import { AxiosApiResponse } from "@/types/ServerResponse";

const NewRepairPage = () => {
  const { data: users, isLoading, isError, error } = useFetchUsers("");
  if (isLoading) {
    return (
      <div className="skeleton mx-auto h-screen w-full max-w-screen-sm border border-gray-700"></div>
    );
  }
  if (isError)
    return (
      <Alert
        type="error"
        message={
          (error as AxiosApiResponse).response?.data.message ?? error.message
        }
      />
    );

  if (!users) return <Alert type="error" message={"No users found"} />;

  return (
    <>
      <CreateRepairForm users={users} />
    </>
  );
};

export default NewRepairPage;
