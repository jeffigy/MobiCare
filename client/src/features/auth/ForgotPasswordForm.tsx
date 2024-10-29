import { useEffect, useState } from "react";
import { useForgotPasswordMutation } from "./authMutation";
import { toast } from "sonner";
import { AxiosApiResponse } from "@/types/ServerResponse";

const ForgotPasswordForm = () => {
  const {
    mutateAsync: forgotPassword,
    isPending,
    isSuccess,
    data,
    isError,
    error,
  } = useForgotPasswordMutation();
  const [email, setEmail] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await forgotPassword({ email });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Success", {
        description: data.message,
      });
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
    <form className="space-y-6" onSubmit={handleSubmit} action="">
      <input
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        type="text"
        placeholder="Email"
        className="input input-primary w-full border-none bg-gray-100"
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

export default ForgotPasswordForm;
