import Input from "@/components/ui/Input";
import { useAddNewRepairMutation } from "@/features/repairs/repairMutations";
import {
  deviceIssueData,
  deviceTypeData,
  statusData,
} from "@/lib/repairFormData";
import { AxiosApiResponse } from "@/types/ServerResponse";
import { UserType } from "@/types/user";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateRepairForm = ({ users }: { users: UserType[] }) => {
  const navigate = useNavigate();
  const {
    mutate: createRepair,
    isSuccess,
    isPending,
    isError,
    error,
  } = useAddNewRepairMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [type, setType] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [imei, setImei] = useState("");
  const [issueCategory, setIssueCategory] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState("");
  const [user, setUser] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const obj = {
      customer: { name, email, number },
      device: { type, brand, model, imeiOrSerialNumber: imei },
      problemDescription: {
        issueCategory,
        details,
      },
      user,
      status,
    };
    createRepair(obj);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Success", {
        description: "New repair was added",
      });
      navigate(-1);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Error", {
        description:
          (error as AxiosApiResponse).response?.data.message ?? error.message,
      });
    }
  }, [isError, error]);

  return (
    <div className="card card-bordered mx-auto flex w-full max-w-screen-sm border-gray-700">
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="card-title">New Repair Form</div>

        <div className="divider divider-secondary">Customer</div>
        <Input
          label="Name"
          value={name}
          onChange={({ target }) => setName(target.value)}
        />
        <Input
          label="Email"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <Input
          label="Number"
          value={number}
          onChange={({ target }) => setNumber(target.value)}
        />

        <div className="divider divider-secondary">Device</div>
        <select
          className="select select-bordered w-full"
          value={type}
          onChange={({ target }) => setType(target.value)}
        >
          <option disabled value={""}>
            Select device type
          </option>
          {Object.values(deviceTypeData).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <Input
          label="Brand"
          value={brand}
          onChange={({ target }) => setBrand(target.value)}
        />
        <Input
          label="Model"
          value={model}
          onChange={({ target }) => setModel(target.value)}
        />
        <Input
          label="IMEI / Serial Number"
          value={imei}
          onChange={({ target }) => setImei(target.value)}
        />

        <div className="divider divider-secondary">Problem Description</div>
        <select
          className="select select-bordered w-full"
          value={issueCategory}
          onChange={({ target }) => setIssueCategory(target.value)}
        >
          <option disabled value={""}>
            Select issue category
          </option>
          {Object.values(deviceIssueData).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <textarea
          className="textarea textarea-bordered"
          placeholder="provide details"
          value={details}
          onChange={({ target }) => setDetails(target.value)}
        ></textarea>

        <div className="divider divider-secondary">Other details</div>
        <select
          className="select select-bordered w-full"
          value={status}
          onChange={({ target }) => setStatus(target.value)}
        >
          <option disabled value={""}>
            Select Status
          </option>
          {Object.values(statusData).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          className="select select-bordered w-full"
          value={user}
          onChange={({ target }) => setUser(target.value)}
        >
          <option disabled value={""}>
            Assign to user
          </option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>

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

export default CreateRepairForm;
