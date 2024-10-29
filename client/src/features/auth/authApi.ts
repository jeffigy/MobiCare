import axiosInstance from "@/store/axiosInstance";

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  return (await axiosInstance.post("/auth/login", credentials)).data;
};

export const logOutUser = async () => {
  return (await axiosInstance.post("/auth/logout")).data;
};

export const refreshUser = async () => {
  return (await axiosInstance.get("/auth/refresh")).data;
};

export const forgotPassword = async (credentials: { email: string }) => {
  return (await axiosInstance.post("/auth/forgot-password", credentials)).data;
};

export const resetPassword = async ({
  credentials,
  token,
}: {
  credentials: {
    password: string;
    confirmPassword: string;
  };
  token: string | undefined;
}) => {
  return (
    await axiosInstance.patch(`/auth/reset-password/${token}`, credentials)
  ).data;
};

export const verifyEmail = async (credentials: { token: string }) => {
  const res = await axiosInstance.get(`/auth/verify/${credentials.token}`);
  return res.data;
};
