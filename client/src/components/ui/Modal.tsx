import { useEffect, useRef } from "react";

type ModalProps = {
  title: string;
  children: React.ReactNode;
  visible: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ title, children, visible, onClose }) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!modalRef.current) {
      return;
    }
    visible ? modalRef.current.showModal() : modalRef.current.close();
  }, [visible]);

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  const handleESC = (event: React.FormEvent) => {
    event.preventDefault();
    handleClose();
  };

  return (
    <dialog
      ref={modalRef}
      id="my_modal_1"
      className="modal"
      onCancel={handleESC}
      onClick={(e) => {
        if (e.target === modalRef.current) {
          handleClose();
        }
      }}
    >
      <div className="modal-box">
        <button
          className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
          onClick={handleClose}
        >
          ✕
        </button>
        <h3 className="text-lg font-bold">{title}</h3>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
