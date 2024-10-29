import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "./authMutation";
import { toast } from "sonner";
import { AxiosApiResponse } from "@/types/ServerResponse";
import AuthInput from "@/components/ui/AuthInput";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {
    mutateAsync: resetPassword,
    isPending,
    isSuccess,
    data,
    isError,
    error,
  } = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await resetPassword({
      credentials: {
        password,
        confirmPassword,
      },
      token,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Success", {
        description: data.message,
      });
      navigate("/");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Error", {
        description:
          (error as AxiosApiResponse).response?.data.message ?? error.message,
      });
    }
  }, [isError, error]);

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <AuthInput
        value={password}
        onChange={({ target }) => setPassword(target.value)}
        placeholder="Password"
      />
      <AuthInput
        value={confirmPassword}
        onChange={({ target }) => setConfirmPassword(target.value)}
        placeholder="Confirm Password"
      />

      <button
        disabled={isPending}
        className={`btn btn-primary !mt-10 w-full`}
        type="submit"
      >
        {" "}
        {isPending ? (
          <>
            <div className="loading"></div>
            Resetting Password...
          </>
        ) : (
          "Reset Password"
        )}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
