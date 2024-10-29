import RepairStatusBadge from "@/components/RepairStatusBadge";
import useFormattedDate from "@/hooks/useFormattedDate";
import { RepairType } from "@/types/Repair";
import { useNavigate } from "react-router-dom";

type RepairProps = {
  repair: RepairType;
};

const Repair: React.FC<RepairProps> = ({ repair }) => {
  const navigate = useNavigate();
  const formattedDate = useFormattedDate(repair.createdAt);
  return (
    <tr
      className="hover:cursor-pointer hover:bg-base-200"
      onClick={() => navigate(`/repairs/${repair.id}`)}
    >
      <td>{repair.device.model}</td>
      <td>{repair.user.name}</td>
      <td className="hidden lg:table-cell">
        <RepairStatusBadge status={repair.status} />
      </td>
      <td className="hidden md:table-cell">{formattedDate}</td>
    </tr>
  );
};
export default Repair;
