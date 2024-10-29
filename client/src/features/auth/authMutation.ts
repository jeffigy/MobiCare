import { useStore } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import {
  forgotPassword,
  loginUser,
  logOutUser,
  refreshUser,
  resetPassword,
  verifyEmail,
} from "./authApi";

export function useLoginMutation() {
  const { setCredentials } = useStore();

  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      loginUser(credentials),
    onSuccess: (data) => {
      setCredentials(data.accessToken);
    },
  });
}

export function useLogoutMutation() {
  const { clearCredentials } = useStore();

  return useMutation({
    mutationFn: () => logOutUser(),
    onSuccess: () => {
      clearCredentials();
    },
  });
}

export function useRefreshMutation() {
  const { setCredentials } = useStore();

  return useMutation({
    mutationFn: () => refreshUser(),
    onSuccess: (data) => {
      setCredentials(data.accessToken);
    },
  });
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: (credentials: { email: string }) => forgotPassword(credentials),
  });
}

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: ({
      credentials,
      token,
    }: {
      credentials: {
        password: string;
        confirmPassword: string;
      };
      token: string | undefined;
    }) => resetPassword({ credentials, token }),
  });
}

export function useVerifyEmail() {
  const { setCredentials } = useStore();
  return useMutation({
    mutationKey: ["verifyEmail"],

    mutationFn: (credentials: { token: string }) => verifyEmail(credentials),
    onSuccess: (data) => {
      setCredentials(data.accessToken);
    },
  });
}
