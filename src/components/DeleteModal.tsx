import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import BlogType from "../types/Blog";

type DeleteModalType = {
  isModalOpen: boolean;
  closeModal: () => void;
  onDeleteBlog: () => Promise<void>;
  targetBlog: BlogType | null;
  customStyles: {
    overlay: React.CSSProperties;
    content: React.CSSProperties;
  };
};

function DeleteModal({
  isModalOpen,
  closeModal,
  onDeleteBlog,
  targetBlog,
  customStyles,
}: DeleteModalType) {
  const navigate = useNavigate();

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Delete Blog"
    >
      <h1 className="text-xl mb-2">Delete Blog</h1>

      <div className="flex flex-col gap-4">
        <p className="text-slate-300">
          Are you sure you want to delete{" "}
          <span className="font-bold">{targetBlog?.title}</span>? This action
          cannot be undone.
        </p>
        <div className="flex gap-2 ml-auto text-sm">
          <button className="bg-transparent" onClick={closeModal}>
            Cancel
          </button>
          <button
            className="bg-red-800 border-0 hover:bg-red-900 transition ease-in-out"
            onClick={async () => {
              await onDeleteBlog();
              closeModal();
              navigate(0);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteModal;
