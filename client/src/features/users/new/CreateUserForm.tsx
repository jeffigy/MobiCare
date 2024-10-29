import Input from "@/components/ui/Input";
import React, { useEffect, useState } from "react";
import { useAddNewUserMutation } from "../userMutations";
import { toast } from "sonner";

import { AxiosApiResponse } from "@/types/ServerResponse";
import { accountRoles } from "@/lib/roles";
import { useNavigate } from "react-router-dom";

const CreateUserForm = () => {
  const navigate = useNavigate();
  const {
    mutate: newUser,
    isPending,
    isSuccess,
    isError,
    error,
    data,
  } = useAddNewUserMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState<string[]>(["user"]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    newUser({ name, email, password, roles });
  };

  const onChangeRoles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const role = e.target.value;
    const isChecked = e.target.checked;
    setRoles((prevSelectedRoles) =>
      isChecked
        ? [...prevSelectedRoles, role]
        : prevSelectedRoles.filter((r) => r !== role),
    );
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Success", {
        description: `New user created. ${data.message}`,
        duration: 10000,
      });
      navigate(-1);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Error", {
        description: (error as AxiosApiResponse).response?.data.message,
      });
    }
  }, [isError, error]);

  return (
    <div className="card card-bordered mx-auto w-full max-w-screen-sm border-gray-700 bg-base-100">
      <form onSubmit={handleSubmit} className="card-body">
        <div className="card-title">New User Form</div>
        <Input
          label="Name"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <Input
          label="Email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          type={"email"}
        />
        <Input
          label="Password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          type={"password"}
        />

        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Roles</span>
          </div>
          {Object.values(accountRoles).map((role) => {
            return (
              <div className="form-control" key={role}>
                <label className="label cursor-pointer justify-start space-x-1">
                  <input
                    type="checkbox"
                    id={role}
                    value={role}
                    checked={roles.includes(role)}
                    onChange={onChangeRoles}
                    className="checkbox-primary checkbox mr-1"
                  />
                  <span className="label-text">{role}</span>
                </label>
              </div>
            );
          })}
        </label>
        <div className="card-actions">
          <button type="submit" className="btn btn-primary w-full">
            {isPending ? (
              <>
                <span className="loading loading-spinner"></span> Submitting...
              </>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
