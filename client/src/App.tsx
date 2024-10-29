import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import RootLayout from "@/components/RootLayout";
import DashboardLayout from "./components/DashboardLayout";
import PersistLogin from "./features/auth/PersistLogin";
import Prefetch from "./features/auth/Prefetch";
import VerifyEmailPage from "./pages/auth/verify";
import RequireAuth from "./features/auth/RequireAuth";
import { accountRoles } from "./lib/roles";

import LoginPage from "@/pages/auth/login";
import Users from "@/pages/dashboard/users";
import Repairs from "@/pages/dashboard/repairs";

const ForgotPassword = lazy(() => import("@/pages/auth/forgot-password"));
const RepairDetailsPage = lazy(
  () => import("./pages/dashboard/repairs/details"),
);
const NewRepairPage = lazy(() => import("./pages/dashboard/repairs/new"));
const EditRepairPage = lazy(
  () => import("./pages/dashboard/repairs/details/edit"),
);
const NewUserPage = lazy(() => import("./pages/dashboard/users/new"));
const UserDetailsPage = lazy(() => import("./pages/dashboard/users/details"));
const EditUserPage = lazy(() => import("./pages/dashboard/users/edit"));
const ProfilePage = lazy(() => import("./pages/dashboard/profile"));
const ResetPasswordPage = lazy(() => import("./pages/auth/reset-password"));
const NotFoundPage = lazy(() => import("./pages/not-found"));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<LoginPage />} />
        <Route path="auth">
          <Route path="verify/:token" element={<VerifyEmailPage />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPasswordPage />} />
        </Route>

        <Route element={<PersistLogin />}>
          <Route
            element={
              <RequireAuth allowedRoles={[...Object.values(accountRoles)]} />
            }
          >
            <Route element={<Prefetch />}>
              <Route element={<DashboardLayout />}>
                <Route path="repairs">
                  <Route index element={<Repairs />} />
                  <Route element={<RequireAuth allowedRoles={["admin"]} />}>
                    <Route path="new" element={<NewRepairPage />} />
                  </Route>
                  <Route path=":id">
                    <Route index element={<RepairDetailsPage />} />
                    <Route path="edit" element={<EditRepairPage />} />
                  </Route>
                </Route>
                <Route element={<RequireAuth allowedRoles={["admin"]} />}>
                  <Route path="users">
                    <Route index element={<Users />} />
                    <Route
                      path="new"
                      element={
                        <Suspense fallback={<p>loading..</p>}>
                          <NewUserPage />
                        </Suspense>
                      }
                    />
                    <Route path=":id">
                      <Route index element={<UserDetailsPage />} />
                      <Route path="edit" element={<EditUserPage />} />
                    </Route>
                  </Route>
                </Route>
                <Route path="profile">
                  <Route index element={<ProfilePage />} />
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
