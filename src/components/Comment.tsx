import { useParams } from "react-router-dom";
import BlogType from "../types/Blog";
import { useState } from "react";
import CircleSpinner from "./CircleSpinner";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DeleteCommentModal from "./DeleteCommentModal";
import axios from "axios";
import CommentType from "../types/Comment";
import notifyToast from "../utils/notifyToast";

function Comment({
  blog,
  fetchBlog,
}: {
  blog: BlogType;
  fetchBlog: () => void;
}) {
  const { blogId } = useParams();
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [targetComment, setTargetComment] = useState<null | CommentType>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (loading) return;

    e.preventDefault();
    setLoading(true);

    const formData = { message, name, email };
    const data = new URLSearchParams(formData);

    try {
      const res = await fetch(
        `http://localhost:3000/api/blogs/${blogId}/comment`,
        {
          method: "POST",
          body: data,
        },
      );

      if (!res.ok) throw new Error("All fields are required");

      setMessage("");
      setName("");
      setEmail("");
      setErrorMessage("");
      fetchBlog();
    } catch (e) {
      let message;
      if (e instanceof Error) message = e.message;
      else message = String(e);

      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = async (commentId: string) => {
    const res = await axios.get(
      `http://localhost:3000/api/blogs/${blogId}/comments/${commentId}`,
    );
    setTargetComment(res.data);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setTargetComment(null);
    setOpenModal(false);
  };

  const handleDeleteComment = async () => {
    if (!targetComment) throw Error("Comment doesn't exist");

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { authorization: `Bearer ${token}` },
      };

      await axios.delete(
        `http://localhost:3000/api/blogs/${blogId}/comments/${targetComment._id}`,
        config,
      );

      notifyToast(`Successfully deleted comment`, "success");
      handleCloseModal();
      fetchBlog();
    } catch (err) {
      if (!axios.isAxiosError(err)) throw err;

      console.error(err);
      notifyToast(err.message, "error");
    }
  };

  return (
    <section>
      <div className="border-y border-slate-100 py-12">
        <h2 className="font-inter-bold text-xl">
          Written by {blog.author.username}
        </h2>
        <p>Hey there! I'm Cold, a web developer.</p>
      </div>

      <form className="my-4 flex flex-col gap-2 py-4" onSubmit={handleSubmit}>
        <h2 className="font-inter-bold text-xl">Post a comment</h2>

        <label htmlFor="message">Message</label>
        <input
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          name="message"
          id="message"
          placeholder="Message"
          required
        />

        <label htmlFor="name">Name</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          name="name"
          id="name"
          placeholder="Name"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          id="email"
          placeholder="Email"
          required
        />

        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

        <button
          disabled={loading}
          className="bg-accent mt-4 inline-flex w-fit items-center justify-self-start rounded-lg px-4 py-2 transition duration-300 ease-in-out hover:opacity-80 hover:active:scale-95 disabled:opacity-80"
        >
          {loading && <CircleSpinner />}
          Post comment
        </button>
      </form>

      <div className="border-t border-slate-100 pt-4 last:border-b-0">
        <h2 className="font-inter-bold text-2xl">
          Comments ({blog.comments.length})
        </h2>
        <ul>
          {blog.comments.map((comment) => {
            return (
              <li
                key={comment._id}
                className="flex justify-between border-b border-slate-400 py-4 last:border-b-0"
              >
                <div className="mb-2">
                  <p>{comment.name}</p>
                  <p className="text-slate-300" title={comment.formatDateTitle}>
                    {comment.formatDate}
                  </p>
                  <p className="mt-2 text-lg">{comment.message}</p>
                </div>

                <div>
                  <button
                    className="flex h-10 w-10 items-center justify-center bg-transparent p-2"
                    onClick={() => handleOpenModal(comment._id)}
                  >
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="h-5 w-5 text-red-600"
                    />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {openModal && (
        <DeleteCommentModal
          openModal={openModal}
          closeModal={handleCloseModal}
          targetComment={targetComment}
          loading={loading}
          onDeleteComment={handleDeleteComment}
        />
      )}
    </section>
  );
}

export default Comment;
