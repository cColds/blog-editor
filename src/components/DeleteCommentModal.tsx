import Modal from "react-modal";
import CommentType from "../types/Comment";
import CircleSpinner from "./CircleSpinner";

const customStyles = {
  overlay: { backgroundColor: "rgba(0, 0, 0, 0.3)" },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "black",
    borderColor: "rgb(60, 60, 60)",
    width: "100%",
    maxWidth: "500px",
    borderRadius: "10px",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

type DeleteComment = {
  openModal: boolean;
  closeModal: () => void;
  targetComment: CommentType | null;
  loading: boolean;
  onDeleteComment: () => void;
};

function DeleteCommentModal({
  openModal,
  closeModal,
  targetComment,
  loading,
  onDeleteComment,
}: DeleteComment) {
  return (
    <Modal
      isOpen={openModal}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Delete Comment Modal"
    >
      <header className="mb-2 flex items-center gap-2 text-xl">
        <h1 className="">Delete Comment</h1>
      </header>
      <p>
        Are you sure you want to delete {targetComment?.message} by{" "}
        <span className="font-bold">{targetComment?.name}?</span>
      </p>

      <div className="mt-4 flex flex-col gap-4">
        <div className="ml-auto flex gap-2 text-sm">
          <button className="bg-transparent" onClick={closeModal}>
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center border-0 bg-red-800 font-semibold transition ease-in-out hover:bg-red-900 disabled:opacity-80"
            onClick={onDeleteComment}
          >
            {loading && <CircleSpinner />}
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteCommentModal;
