import Modal from "react-modal";
import BlogType from "../types/Blog";
import EditBlog from "./EditBlog";

type EditModalType = {
  isModalOpen: boolean;
  closeModal: () => void;
  targetBlog: BlogType | null;
  customStyles: {
    overlay: React.CSSProperties;
    content: React.CSSProperties;
  };
  fetchBlogs: () => Promise<void>;
};

function EditModal({
  isModalOpen,
  closeModal,
  targetBlog,
  customStyles,
  fetchBlogs,
}: EditModalType) {
  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Edit Blog"
    >
      <header className="mb-2 flex items-center gap-2 text-xl">
        <h1 className="">Edit Blog</h1>
      </header>

      <EditBlog
        closeModal={closeModal}
        targetBlog={targetBlog}
        fetchBlogs={fetchBlogs}
      />
    </Modal>
  );
}

export default EditModal;
