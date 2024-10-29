import { useNavigate, useParams } from "react-router-dom";
import { useVerifyEmail } from "./authMutation";
import usePersist from "@/hooks/usePersist";
import { useEffect, useRef, useState } from "react";
import Alert from "@/components/ui/Alert";
import { AxiosApiResponse } from "@/types/ServerResponse";
import Loader from "@/components/ui/Loader";

const VerifyEmailComponent = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [_persist, setPersist] = usePersist();
  const [countdown, setCountdown] = useState(5);
  const verifyCalled = useRef(false);
  const {
    mutate: verifyEmail,
    data,
    isPaused,
    isIdle,
    status,
    isPending,
    isSuccess,
    isError,
    error,
  } = useVerifyEmail();

  useEffect(() => {
    if (token && verifyCalled.current === true) {
      const verify = () => {
        try {
          verifyEmail({ token });
        } catch (error) {
          console.log(error);
        }
      };

      verify();
    }

    return () => {
      verifyCalled.current = true;
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setPersist(true);
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      const timeout = setTimeout(() => {
        navigate("/repairs");
      }, 5000);

      return () => {
        clearInterval(timer);
        clearTimeout(timeout);
      };
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    console.log("Mutation State:", {
      isSuccess,
      isError,
      error,
      isPending,
      data,
      isPaused,
      isIdle,
      status,
    });
  }, [isSuccess, isError, error, isPending, data, isPaused, isIdle, status]);

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return (
      <Alert
        message={
          (error as AxiosApiResponse).response?.data.message ?? error.message
        }
        type="error"
      />
    );
  }

  if (isSuccess) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12">
        <div className="max-w-xl space-y-3 text-center">
          <h2 className="text-[42px] font-bold text-base-content">Success</h2>
          <p className="text-lg text-base-content">
            Your email has been verified successfully! You will be redirected in{" "}
            <span className="text-[20px] font-bold text-primary">
              {countdown}
            </span>{" "}
            seconds.
          </p>
        </div>
      </div>
    );
  }
};

export default VerifyEmailComponent;
