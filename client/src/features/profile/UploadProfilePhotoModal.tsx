import Modal from "@/components/ui/Modal";
import { Image, PencilIcon } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useUploadImageMutation } from "./profileMutation";
import Alert from "@/components/ui/Alert";
import { toast } from "sonner";

const UploadProfilePhotoModal = ({ userId }: { userId: string }) => {
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const {
    mutateAsync: uploadImage,
    isPending,
    isError,
    isSuccess,
    error,
  } = useUploadImageMutation();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setImage(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleCloseModal = () => {
    setShowModal(!showModal);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image to upload");
      return;
    }

    const formData = new FormData();
    formData.append("uploadType", "profile");
    formData.append("id", userId);
    formData.append("image", image);

    try {
      await uploadImage(formData);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Success", {
        description: "Profile successfully updated",
      });
      handleCloseModal();
      setImage(null);
    }
  }, [isSuccess]);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-circle btn-primary btn-sm absolute -bottom-3 left-0 right-0 m-auto p-1"
      >
        <PencilIcon />
      </button>
      <Modal
        title="Upload profile photo"
        onClose={handleCloseModal}
        visible={showModal}
      >
        <div className="flex flex-col items-center space-y-2">
          {isError && <Alert message={error.message} type="error" />}
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-upload"
            className="btn btn-primary btn-neutral w-full border-none"
          >
            <Image className="mr-1" />
            {image ? "Change File " : "Select File"}
          </label>
          {previewUrl && (
            <img src={previewUrl} alt="Selected preview" className="w-80" />
          )}
          {image && (
            <button onClick={handleSubmit} className="btn btn-primary w-full">
              {isPending ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default UploadProfilePhotoModal;
