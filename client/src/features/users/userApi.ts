import axiosInstance from "@/store/axiosInstance";
import { UserFormType, UserType } from "@/types/user";

export const fetchUsers = async ({
  email,
  search,
}: {
  email?: string;
  search?: string;
}) => {
  return (
    await axiosInstance.get<UserType[]>("/users", {
      params: {
        email,
        search,
      },
    })
  ).data;
};

export const addNewUser = async (data: UserFormType) => {
  return (await axiosInstance.post("/users", data)).data;
};

export const editUser = async (data: UserFormType) => {
  return (await axiosInstance.patch("/users", data)).data;
};

export const deleteUser = async (id: string) => {
  return (await axiosInstance.delete(`/users/${id}`)).data;
};
