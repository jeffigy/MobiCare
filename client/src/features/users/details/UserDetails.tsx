import { useFetchUsers } from "../userQueries";
import Alert from "@/components/ui/Alert";
import { PencilIcon } from "lucide-react";
import UserDetailsLoading from "./UserDetailsLoading";
import DeleteUserModal from "../delete/DeleteUserModal";
import useAuth from "@/hooks/useAuth";
import { Link, useParams } from "react-router-dom";
import { UserType } from "@/types/user";
import { LazyLoadImage } from "react-lazy-load-image-component";

const UserDetails = () => {
  const { id } = useParams();
  const { email } = useAuth();

  const { data, isLoading, isError, error } = useFetchUsers(email);
  const userDetail = data && data.find((user: UserType) => user.id === id);
  if (isLoading) return <UserDetailsLoading />;
  if (isError) return <Alert type="error" message={error.message} />;
  if (!userDetail) return <Alert type="error" message="User not found" />;

  return (
    <div className="card card-bordered mx-auto flex w-full max-w-screen-sm flex-col border-gray-700 bg-base-100">
      <div className="card-body space-y-2">
        <div className="avatar mx-auto">
          <div className="w-40 rounded-full">
            <LazyLoadImage
              src={
                userDetail.imageUrl ??
                "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              }
              alt="User Avatar"
            />
          </div>
        </div>
        <p className="mx-auto text-xl font-bold">{userDetail.name}</p>
        <div className="card-actions justify-center">
          <Link
            to={`/users/${userDetail.id}/edit`}
            className="btn btn-primary max-w-sm grow"
          >
            <PencilIcon /> Edit
          </Link>
          <DeleteUserModal user={userDetail} />
        </div>
        <UserDetail showDivider={true} label="Email" value={userDetail.email} />
        <UserDetail
          showDivider={true}
          label="Active Status"
          value={String(userDetail.active ? "Enabled" : "Disabled")}
        />
        <UserDetail
          showDivider={true}
          label="Account Verification"
          value={String(userDetail.verified ? "Verified" : "Not verified")}
        />
        <UserDetail
          showDivider={false}
          label="Role"
          value={userDetail.roles
            .map(
              (role: string) =>
                ` ${role.charAt(0).toUpperCase()}${role.slice(1)}`,
            )
            .join(", ")}
        />
      </div>
    </div>
  );
};

// UserDetail component for displaying user-specific details
const UserDetail = ({
  label,
  value,
  showDivider,
}: {
  label: string;
  value: string;
  showDivider: boolean;
}) => {
  return (
    <div>
      <p className="font-bold text-gray-500">{label}</p>
      <p>{value}</p>
      {showDivider && <div className="divider"></div>}
    </div>
  );
};

export default UserDetails;
