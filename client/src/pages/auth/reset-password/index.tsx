import ResetPasswordForm from "@/features/auth/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center px-4 py-6">
      <div className="mx-auto w-full max-w-md space-y-6">
        <h3 className="mb-8 text-3xl font-extrabold max-md:text-center">
          Reset password
        </h3>
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
