import { UserType } from "@/types/user";
import { BadgeCheck, BadgeX, UserRoundCheck, UserRoundX } from "lucide-react";
import { Link } from "react-router-dom";

const User = ({ user }: { user: UserType }) => {
  return (
    <Link
      to={`/users/${user.id}`}
      className="card card-bordered w-full max-w-screen-sm border-gray-700 bg-base-100 hover:cursor-pointer hover:bg-base-200"
      key={user.id}
    >
      <div className="card-body flex-row items-center">
        <AccountState isActive={user.active} />
        <div className="w-full grow overflow-hidden">
          <p className="">{user.email}</p>
        </div>
        <VericationBadge isVerified={user.verified} />
      </div>
    </Link>
  );
};

const VericationBadge = ({ isVerified }: { isVerified: boolean }) => {
  return (
    <>
      {isVerified ? (
        <div className="tooltip tooltip-success" data-tip="Account verified">
          <BadgeCheck className="text-success" />
        </div>
      ) : (
        <div className="tooltip tooltip-error" data-tip="Account not verified">
          <BadgeX className="text-error" />
        </div>
      )}
    </>
  );
};

const AccountState = ({ isActive }: { isActive: boolean }) => {
  return (
    <>
      {isActive ? (
        <div className="tooltip tooltip-success" data-tip="Account enabled">
          <UserRoundCheck className="text-success" />
        </div>
      ) : (
        <div className="tooltip tooltip-error" data-tip="Account dissabled">
          <UserRoundX className="text-error" />
        </div>
      )}
    </>
  );
};

export default User;
