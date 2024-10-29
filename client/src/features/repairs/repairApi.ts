import axiosInstance from "@/store/axiosInstance";
import { RepairFormType, RepairType } from "@/types/Repair";

type PaginationRepairs = {
  items: RepairType[];
  limit: number;
  page: number;
  total: number;
};

export const fetchRepairs = async ({
  page,
  limit,
  search,
  sortDate,
  status,
}: {
  page?: number;
  limit?: number;
  search?: string;
  sortDate?: string;
  status?: string[];
}) => {
  const statusQuery = status?.join(",");
  return (
    await axiosInstance.get<PaginationRepairs>(
      `/repairs?page=${page}&limit=${limit}&search=${search}&sortDate=${sortDate}&status=${statusQuery}`,
    )
  ).data;
};

export const AddNewRepair = async (data: RepairFormType) => {
  return (await axiosInstance.post("/repairs", data)).data;
};

export const EditRepair = async (data: RepairFormType) => {
  return (await axiosInstance.patch("/repairs", data)).data;
};

export const deleteRepair = async (id: string) => {
  return (await axiosInstance.delete(`/repairs/${id}`)).data;
};
