import useFormattedDate from "@/hooks/useFormattedDate";
import { RepairType } from "@/types/Repair";
import { PencilIcon } from "lucide-react";

import DeleteRepairModal from "../delete/DeleteRepairModal";
import { Link } from "react-router-dom";

const RepairDetails = ({ repair }: { repair: RepairType }) => {
  const createdAt = useFormattedDate(repair?.createdAt);
  const updatedAt = useFormattedDate(repair?.updatedAt);

  const customerDetails = [
    { label: "Email", value: repair.customer.email },
    { label: "Name", value: repair.customer.name },
    { label: "Number", value: repair.customer.number },
  ];

  const deviceDetails = [
    { label: "Type", value: repair.device.type },
    { label: "Brand", value: repair.device.brand },
    { label: "Model", value: repair.device.model },
    { label: "IMEI", value: repair.device.imeiOrSerialNumber },
  ];

  const problemDetails = [
    { label: "Category", value: repair.problemDescription.issueCategory },
    { label: "Details", value: repair.problemDescription.details },
  ];

  const otherDetails = [
    { label: "Date Created", value: createdAt },
    { label: "Date Updated", value: updatedAt },
    { label: "Status", value: repair.status },
    { label: "Assign to", value: repair.user.name },
  ];

  return (
    <div className="mx-auto w-full max-w-screen-md border border-gray-700">
      <DetailHeader name="Customer" />
      {customerDetails.map((detail) => (
        <DetailRow
          key={detail.label}
          label={detail.label}
          value={detail.value}
        />
      ))}

      <DetailHeader name="Device" />
      {deviceDetails.map((detail) => (
        <DetailRow
          key={detail.label}
          label={detail.label}
          value={detail.value}
        />
      ))}

      <DetailHeader name="Problem" />
      {problemDetails.map((detail) => (
        <DetailRow
          key={detail.label}
          label={detail.label}
          value={detail.value}
        />
      ))}

      <DetailHeader name="Images" />
      <DetailRow label="" value={"Images function is a future plan"} />

      <DetailHeader name="Other Details" />
      {otherDetails.map((detail) => (
        <DetailRow
          key={detail.label}
          label={detail.label}
          value={detail.value}
        />
      ))}
      <div className="mx-auto my-2 flex w-full max-w-screen-sm justify-between px-3 md:px-0">
        <Link
          className="btn btn-outline btn-warning border-none"
          to={`/repairs/${repair.id}/edit`}
        >
          <PencilIcon />
          <p className="hidden md:block">Edit</p>
        </Link>
        <DeleteRepairModal repair={repair} />
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }: { label: string; value: any }) => {
  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-screen-sm justify-between border-b border-gray-700 px-3 py-2 md:px-0">
        <p className="text-gray-400">{label}</p>
        <p>{value}</p>
      </div>
    </div>
  );
};

const DetailHeader = ({ name }: { name: string }) => {
  return (
    <div className="w-full bg-secondary px-1 font-bold text-gray-700">
      {name}
    </div>
  );
};

export default RepairDetails;
