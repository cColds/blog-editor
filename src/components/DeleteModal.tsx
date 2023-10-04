import Modal from "react-modal";
import BlogType from "../types/Blog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

type DeleteModalType = {
  isModalOpen: boolean;
  closeModal: () => void;
  onDeleteBlog: () => Promise<void>;
  targetBlog: BlogType | null;
  customStyles: {
    overlay: React.CSSProperties;
    content: React.CSSProperties;
  };
  fetchBlogs: () => Promise<void>;
};

function DeleteModal({
  isModalOpen,
  closeModal,
  onDeleteBlog,
  targetBlog,
  customStyles,
  fetchBlogs,
}: DeleteModalType) {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Delete Blog"
    >
      <header className="mb-2 flex items-center gap-2 text-xl">
        <FontAwesomeIcon icon={faCircleExclamation} className="text-red-800" />
        <h1 className="">Delete Blog</h1>
      </header>

      <div className="flex flex-col gap-4">
        <p className="text-slate-300">
          Are you sure you want to delete{" "}
          <span className="font-bold">{targetBlog?.title}</span>? This action
          cannot be undone.
        </p>
        <div className="ml-auto flex gap-2 text-sm">
          <button className="bg-transparent" onClick={closeModal}>
            Cancel
          </button>
          <button
            className="border-0 bg-red-800 transition ease-in-out hover:bg-red-900"
            onClick={async () => {
              await onDeleteBlog();
              closeModal();
              fetchBlogs();
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
