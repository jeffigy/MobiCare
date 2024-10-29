import Alert from "@/components/ui/Alert";
import User from "./User";
import UserListLoading from "./UserListLoading";
import { useFetchUsers } from "./userQueries";
import useAuth from "@/hooks/useAuth";
import { AxiosApiResponse } from "@/types/ServerResponse";
import { UserType } from "@/types/user";

const UsersList = () => {
  const { email } = useAuth();
  const { data: users, isLoading, isError, error } = useFetchUsers(email);

  if (isLoading) return <UserListLoading />;

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
    <div className="flex flex-col items-center space-y-5">
      {users?.map((user: UserType) => <User key={user.id} user={user} />)}
    </div>
  );
};

export default UsersList;
