import React, { ChangeEvent, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputProps = {
  label?: string;
  placeholder?: string;
  value: string;
  type?: "text" | "password" | "email";
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  [key: string]: any;
};

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  type = "text",
  onChange,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const isPassword = type === "password";

  return (
    <label className="form-control w-full">
      {label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      <div className="relative w-full">
        <input
          type={isPassword && !showPassword ? "password" : "text"}
          placeholder={placeholder}
          className="input input-bordered w-full pr-12"
          value={value}
          onChange={onChange}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </label>
  );
};

export default Input;
