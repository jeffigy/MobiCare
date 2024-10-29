import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import { useEffect, useState } from "react";
import { useChangeUserPasswordMutation } from "./profileMutation";
import { toast } from "sonner";
import { AxiosApiResponse } from "@/types/ServerResponse";

const ChangePasswordModal = ({ id }: { id: string }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const {
    mutate: changePassword,
    isPending,
    isError,
    isSuccess,
    error,
  } = useChangeUserPasswordMutation();

  const handleCloseModal = () => {
    setShowModal(!showModal);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    changePassword({ id, currentPassword, newPassword, confirmPassword });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Success", {
        description: "Password changed",
      });
      setConfirmPassword("");
      setCurrentPassword("");
      setNewPassword("");
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
        Change Password
      </button>
      <Modal
        title="Change Password"
        onClose={handleCloseModal}
        visible={showModal}
      >
        <form onSubmit={handleSubmit}>
          <div className="my-3">
            <Input
              type={"password"}
              label="Current Password"
              value={currentPassword}
              onChange={({ target }) => setCurrentPassword(target.value)}
            />
            <Input
              type={"password"}
              label="New password"
              value={newPassword}
              onChange={({ target }) => setNewPassword(target.value)}
            />
            <Input
              type={"password"}
              label="Confirm Password"
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
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

export default ChangePasswordModal;
