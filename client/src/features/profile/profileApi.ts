import axiosInstance from "@/store/axiosInstance";
import { UserType } from "@/types/user";

export const fetchUserProfile = async (email: string) => {
  return (
    await axiosInstance.get<UserType>("/profile", {
      params: {
        email,
      },
    })
  ).data;
};

export const updateUserName = async (data: { id: string; name: string }) => {
  return (await axiosInstance.patch("/profile/name", data)).data;
};

export const changeUserPassword = async (data: {
  id: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  return (await axiosInstance.patch("/profile/password", data)).data;
};

export const uploadImage = async (data: any) => {
  return (
    await axiosInstance.post<{ imageUrl: string }>("/profile", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  ).data;
};
