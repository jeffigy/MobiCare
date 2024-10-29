import { useMutation, useQueryClient } from "@tanstack/react-query";
import { changeUserPassword, updateUserName, uploadImage } from "./profileApi";

export function useUpdateUserNameMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { name: string; id: string }) => updateUserName(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}
export function useChangeUserPasswordMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: {
      id: string;
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) => changeUserPassword(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
}

export function useUploadImageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => uploadImage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });
}
