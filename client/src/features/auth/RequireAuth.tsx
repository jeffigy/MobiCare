import useAuth from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { roles } = useAuth();
  const location = useLocation();

  return (
    <>
      {roles.some((role) => allowedRoles.includes(role)) ? (
        <Outlet />
      ) : (
        <Navigate state={{ from: location }} to="/" replace={true} />
      )}
    </>
  );
};

export default RequireAuth;
