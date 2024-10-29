import Alert from "@/components/ui/Alert";
import EditUserForm from "@/features/users/edit/EditUserForm";
import { useFetchUsers } from "@/features/users/userQueries";
import useAuth from "@/hooks/useAuth";
import { UserType } from "@/types/user";
import { useParams } from "react-router-dom";

const EditUserPage = () => {
  const { id } = useParams();
  const { email } = useAuth();
  const { data, isLoading, isError, error } = useFetchUsers(email);
  const user = data?.find((user: UserType) => user.id === id);

  if (isLoading) return <p>loading...</p>;
  if (isError) return <Alert message={error.message} type="error" />;
  if (!user) return <Alert message={"User not found"} type="error" />;
  return <EditUserForm user={user} />;
};

export default EditUserPage;
