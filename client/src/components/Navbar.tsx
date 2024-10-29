import { useLogoutMutation } from "@/features/auth/authMutation";
import useAuth from "@/hooks/useAuth";
import Logo from "@/assets/logo.png";
import {
  ChevronDown,
  ClipboardCheck,
  LogOut,
  Menu,
  User,
  Users,
} from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

const navLinks = [
  {
    icon: <ClipboardCheck />,
    href: "/repairs",
    name: "Repairs",
  },
  { icon: <Users />, href: "/users", name: "Users" },
  {
    icon: <User />,
    href: "/profile",
    name: "Profile",
  },
];

const Navbar = () => {
  return (
    <div className="sticky top-0 z-10 flex justify-center bg-base-100 shadow-md">
      <div className="flex h-16 w-full max-w-screen-xl items-center justify-between px-5">
        <Link to={navLinks[0].href} className="flex items-center text-2xl">
          <LazyLoadImage className="w-14" src={Logo} />
          <p className="hidden lg:block"> MobiCare</p>
        </Link>
        <DesktopNav />
        <MobileNav />
      </div>
    </div>
  );
};

const DesktopNav = () => {
  const navigate = useNavigate();
  const { email, roles } = useAuth();
  const { isPending, mutateAsync: logout } = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  const filteredNavLinks = roles.includes("admin")
    ? navLinks
    : navLinks.filter((link) => link.name !== "Users");

  return (
    <div className="hidden items-center space-x-5 md:flex">
      {filteredNavLinks.map((navlink) => (
        <NavLink
          key={navlink.name}
          to={navlink.href}
          className={({ isActive }) =>
            `flex justify-center p-2 ${
              isActive ? "border-b-4 border-primary text-primary" : ""
            }`
          }
        >
          {navlink.icon}{" "}
          <p className="hidden lg:ml-2 lg:block">{navlink.name}</p>
        </NavLink>
      ))}
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn rounded-full">
          {email}
          <ChevronDown />
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
        >
          <li>
            <button onClick={() => handleLogout()}>
              <LogOut />
              {isPending ? "logging out..." : "logout"}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

const MobileNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, roles } = useAuth();
  const { isPending, mutateAsync: logout } = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  const filteredNavLinks = roles.includes("admin")
    ? navLinks
    : navLinks.filter((link) => link.name !== "Users");

  return (
    <div className="z-20 flex justify-end md:hidden">
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer-4"
            className="btn btn-outline btn-primary drawer-button"
          >
            <Menu />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu min-h-full w-80 bg-base-200 px-5 text-base-content">
            <div className="h-16">
              <li className="flex grow flex-col justify-end">
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className="btn btn-active"
                  onClick={() => navigate(filteredNavLinks[0].href)}
                >
                  {email}
                </label>
              </li>
            </div>
            {filteredNavLinks.map((navlink) => (
              <li key={navlink.name}>
                <label
                  htmlFor="my-drawer-4"
                  aria-label="close sidebar"
                  className={`mb-3 rounded-none p-2 text-2xl ${
                    location.pathname === navlink.href
                      ? "border-b-4 border-primary text-primary"
                      : null
                  }`}
                  key={navlink.name}
                  onClick={() => navigate(navlink.href)}
                >
                  {navlink.icon}
                  {navlink.name}
                </label>
              </li>
            ))}
            <li className="flex grow flex-col justify-end">
              <button
                className="btn-xl btn btn-active"
                onClick={() => handleLogout()}
              >
                <LogOut />
                {isPending ? "logging out..." : "logout"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
