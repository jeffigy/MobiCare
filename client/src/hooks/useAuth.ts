import { useStore } from "@/store/store";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  UserInfo: {
    email: string;
    roles: string[];
  };
};

const useAuth = () => {
  const { token } = useStore.getState();

  if (!token) {
    return { email: "", roles: [], status: "", isAdmin: false, isUser: false };
  }

  const decoded: DecodedToken = jwtDecode(token);
  const { email, roles } = decoded.UserInfo;

  const isAdmin = roles.includes("admin");
  const isUser = roles.includes("user");

  const status = isAdmin ? "Admin" : "User";

  return { email, roles, status, isAdmin, isUser };
};

export default useAuth;
