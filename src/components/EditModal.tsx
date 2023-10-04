import Modal from "react-modal";
import BlogType from "../types/Blog";
import BlogForm from "./BlogForm";

type EditModalType = {
  isModalOpen: boolean;
  closeModal: () => void;
  targetBlog: BlogType | null;
  customStyles: {
    overlay: React.CSSProperties;
    content: React.CSSProperties;
  };
};

function EditModal({
  isModalOpen,
  closeModal,
  targetBlog,
  customStyles,
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

      <BlogForm closeModal={closeModal} targetBlog={targetBlog} />
    </Modal>
  );
}

export default EditModal;
