import LoginForm from "@/features/auth/LoginForm";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Logo from "@/assets/logo.png";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-6">
      <div className="grid w-full max-w-6xl items-center gap-10 md:grid-cols-2">
        <div className="flex flex-col items-center">
          <LazyLoadImage src={Logo} className="w-20 lg:w-32" />
          <h2 className="text-3xl lg:text-5xl lg:leading-[55px]">MobiCare</h2>
        </div>

        <div className="w-full max-w-md space-y-6 max-md:mx-auto md:ml-auto">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
