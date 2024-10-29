import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { UserType } from "@/types/user";
import { useEffect, useState } from "react";

import { toast } from "sonner";
import { AxiosApiResponse } from "@/types/ServerResponse";
import { useUpdateUserNameMutation } from "./profileMutation";

const UpdateNameModal = ({ user }: { user: UserType }) => {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState(user.name);

  const {
    mutate: updateName,
    isPending,
    isError,
    isSuccess,
    error,
  } = useUpdateUserNameMutation();

  const handleCloseModal = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateName({ id: user.id, name });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Success", {
        description: "Name updated",
      });
      setName("");
      handleCloseModal();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Error", {
        description:
          (error as AxiosApiResponse).response?.data.message ?? error.message,
      });
    }
  }, [isError]);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-outline btn-primary btn-sm grow border-none"
      >
        Update Name{" "}
      </button>
      <Modal title="Update Name" onClose={handleCloseModal} visible={showModal}>
        <form onSubmit={handleSubmit}>
          <div className="my-3">
            <Input
              label="Name"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>

          <div className="card-actions justify-end">
            <button type="submit" className="btn btn-primary">
              {" "}
              {isPending ? (
                <>
                  <span className="loading loading-spinner"></span>{" "}
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UpdateNameModal;
