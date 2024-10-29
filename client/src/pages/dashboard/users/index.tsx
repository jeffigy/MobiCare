import Fab from "@/components/ui/Fab";
import SearchUser from "@/features/users/SearchUser";
import UsersList from "@/features/users/UsersList";
import { UserPlus2 } from "lucide-react";

const Users = () => {
  return (
    <>
      <SearchUser />
      <UsersList />
      <Fab icon={<UserPlus2 />} href="/users/new" />
    </>
  );
};

export default Users;
