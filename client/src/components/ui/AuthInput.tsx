import React, { useState, ChangeEvent } from "react";
import { Eye, EyeOff } from "lucide-react";

type AuthInputProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  [key: string]: any;
};

const AuthInput: React.FC<AuthInputProps> = ({
  value,
  onChange,
  placeholder = "Password",
  className = "input input-primary w-full border-none bg-gray-100",
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative w-full">
      <input
        value={value}
        onChange={onChange}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className={`${className} pr-12`} // Add padding to account for the icon
        {...rest}
      />
      <button
        type="button"
        onClick={toggleShowPassword}
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </button>
    </div>
  );
};

export default AuthInput;
