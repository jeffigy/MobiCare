import Modal from "@/components/ui/Modal";
import { RepairType } from "@/types/Repair";
import { AxiosApiResponse } from "@/types/ServerResponse";
import { Trash2Icon } from "lucide-react";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDeleteRepairMutation } from "../repairMutations";
import { useNavigate } from "react-router-dom";

const DeleteRepairModal = ({ repair }: { repair: RepairType }) => {
  const navigate = useNavigate();
  const {
    mutate: deleteRepair,
    isPending,
    isSuccess,
    isError,
    error,
  } = useDeleteRepairMutation();

  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(!showModal);
  };

  const handleDelete = (e: React.FormEvent) => {
    e.preventDefault();
    deleteRepair(repair.id);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Success", {
        description: "Repair successfully deleted",
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
    <>
      <button
        className="btn btn-outline btn-error border-none"
        onClick={() => setShowModal(true)}
      >
        <Trash2Icon /> Delete
      </button>
      <Modal
        onClose={handleCloseModal}
        visible={showModal}
        title="Delete Repair"
      >
        <p>are you sure on deleting the repair with the following details?</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-outline btn-error border-none"
            onClick={handleDelete}
          >
            {isPending ? (
              <>
                <span className="loading loading-spinner"></span> Deleting...
              </>
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteRepairModal;
