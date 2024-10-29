import React, { useEffect, useState } from "react";
import { useEditUserMutation } from "../userMutations";
import { toast } from "sonner";
import { AxiosApiResponse } from "@/types/ServerResponse";
import { accountRoles } from "@/lib/roles";
import { UserType } from "@/types/user";
import { useNavigate } from "react-router-dom";

const EditUserForm = ({ user }: { user: UserType }) => {
  const navigate = useNavigate();
  const {
    mutate: editUser,
    isPending,
    isSuccess,
    isError,
    error,
    data,
  } = useEditUserMutation();

  const [active, setActive] = useState(user.active);
  const [roles, setRoles] = useState<string[]>(user.roles);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editUser({ id: user.id, active, roles });
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
        description: data.message,
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
        <div className="card-title">Edit User Form</div>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">
              Active Status: {active ? "Enabled" : "Disabled"}
            </span>
          </div>
          <input
            type="checkbox"
            onChange={() => setActive(!active)}
            checked={active}
            className="toggle toggle-info"
          />
        </label>

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

export default EditUserForm;
