import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex flex-col space-y-5 p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
