import React from "react";
import { Link } from "react-router-dom";

type FabProps = {
  href: string;
  icon: React.ReactNode;
};

const Fab: React.FC<FabProps> = ({ href, icon }) => {
  return (
    <Link to={href}>
      <button
        className={`btn btn-circle btn-primary fixed bottom-6 right-6 z-10`}
      >
        <span className="absolute h-[35px] w-[35px] animate-ping rounded-full bg-primary"></span>
        {icon}
      </button>
    </Link>
  );
};
export default Fab;
