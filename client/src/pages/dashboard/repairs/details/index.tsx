import RepairDetails from "@/features/repairs/details/RepairDetails";
import { useRepairs } from "@/features/repairs/repairQueries";
import Alert from "@/components/ui/Alert";
import DetailsLoading from "@/features/repairs/details/DetailsLoading";
import { useParams } from "react-router-dom";
import { AxiosApiResponse } from "@/types/ServerResponse";

const RepairDetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useRepairs();
  const repair = data?.items.find((repair) => repair.id === id);

  if (isLoading) return <DetailsLoading />;

  if (isError)
    return (
      <Alert
        message={
          (error as AxiosApiResponse).response?.data.message ?? error?.message
        }
        type="error"
      />
    );

  if (!repair) return <Alert message={"Repair not found"} type="error" />;

  return <RepairDetails repair={repair} />;
};

export default RepairDetailsPage;
