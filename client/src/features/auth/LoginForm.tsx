import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "./authMutation";
import { AxiosApiResponse } from "@/types/ServerResponse";
import usePersist from "@/hooks/usePersist";
import AuthInput from "@/components/ui/AuthInput";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    isPending,
    isError,
    error,
    mutate: login,
    isSuccess,
  } = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [persist, setPersist] = usePersist();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate(location.state?.from || "/repairs");
    }
  }, [isSuccess]);

  return (
    <form className="space-y-6" onSubmit={handleLogin}>
      {isError && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            {(error as AxiosApiResponse).response?.data.message ??
              error.message}
          </span>
        </div>
      )}
      <input
        value={email}
        onChange={({ target }) => setEmail(target.value)}
        type="email"
        placeholder="Email"
        className="input input-primary w-full border-none bg-gray-100"
      />
      <AuthInput
        onChange={({ target }) => setPassword(target.value)}
        placeholder="Password"
        value={password}
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            onChange={() => setPersist(!persist)}
            checked={persist}
          />
          <label htmlFor="" className="ml-3 block text-sm">
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <Link
            to={"/auth/forgot-password"}
            className="btn btn-link no-underline"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
      <button
        className={`&& "btn-disabled" } btn btn-primary !mt-10 w-full`}
        type="submit"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <span className="loading loading-spinner"></span>
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
