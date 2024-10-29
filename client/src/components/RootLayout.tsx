import Loader from "@/components/ui/Loader";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="min-h-screen w-full">
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default RootLayout;
