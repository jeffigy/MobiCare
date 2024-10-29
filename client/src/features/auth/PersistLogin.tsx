import usePersist from "@/hooks/usePersist";
import { useStore } from "@/store/store";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authMutation";
import { Outlet, useNavigate } from "react-router-dom";
import Loader from "@/components/ui/Loader";

const PersistLogin = () => {
  const navigate = useNavigate();
  const [persist] = usePersist();
  const { token } = useStore.getState();
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const {
    isPending,
    isSuccess,
    isError,
    error,
    isIdle,
    mutateAsync: refresh,
  } = useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const verifyRefreshToken = async () => {
        console.log("verifying refresh token");
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => {
      effectRan.current = true;
    };
  }, []);

  if (!persist) {
    return <Outlet />;
  }

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return (
      <p className="errmsg">
        {`${error.message} - `}
        <button onClick={() => navigate("/", { replace: true })}>
          Please login again
        </button>
        .
      </p>
    );
  }

  if (isSuccess && trueSuccess) {
    return <Outlet />;
  }

  if (token && isIdle) {
    return <Outlet />;
  }
};

export default PersistLogin;
