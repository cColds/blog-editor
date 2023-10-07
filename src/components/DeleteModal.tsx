import Modal from "react-modal";
import BlogType from "../types/Blog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import notifyToast from "../utils/notifyToast";
import axios from "axios";

type DeleteModalType = {
  isModalOpen: boolean;
  closeModal: () => void;
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
  targetBlog,
  customStyles,
  fetchBlogs,
}: DeleteModalType) {
  const handleDeleteBlog = async () => {
    const blogId = targetBlog?._id || "";
    const token = localStorage.getItem("token");
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };

    try {
      const res = await axios.delete(
        "http://localhost:3000/api/blogs/" + blogId,
        config,
      );
      console.log(res.data);

      notifyToast("Deleted blog successfully", "success");
      closeModal();
      fetchBlogs();
    } catch (err) {
      if (err instanceof Error) {
        notifyToast(err.message, "error");
      }
      console.error(err);
    }
  };

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
            onClick={handleDeleteBlog}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteModal;
