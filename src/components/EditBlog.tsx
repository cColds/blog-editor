import { useReducer, useState } from "react";
import axios from "axios";
import BlogType from "../types/Blog";
import notifyToast from "../utils/notifyToast";
import blogFormReducer from "../reducers/blogFormReducer";
import SubmitFormError from "../types/SubmitFormError";
import BlogForm from "./BlogForm";

function EditBlog({
  closeModal,
  targetBlog,
  fetchBlogs,
}: {
  closeModal: () => void;
  targetBlog: BlogType | null;
  fetchBlogs: () => Promise<void>;
}) {
  const [state, dispatch] = useReducer(blogFormReducer, {
    title: targetBlog?.title || "",
    description: targetBlog?.description || "",
    body: targetBlog?.body || "",
    published: targetBlog?.published || false,
    image: targetBlog?.img || null,
    errors: { title: "", description: "", body: "", image: "" },
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (targetBlog == null) throw new Error("Can't edit blog of type null");

    e.preventDefault();
    setLoading(true);

    try {
      const blogId = targetBlog._id;
      const formData = new FormData();
      formData.append("title", state.title);
      formData.append("description", state.description);
      formData.append("body", state.body);
      formData.append("published", state.published.toString());
      if (state.image) formData.append("image", state.image);
      else formData.append("image", targetBlog.img);

      const token = localStorage.getItem("token");
      const config = {
        headers: { authorization: `Bearer ${token}` },
      };

      await axios.put(
        "http://localhost:3000/api/blogs/" + blogId,
        formData,
        config,
      );

      notifyToast("Blog edited successfully", "success");
      closeModal();
      fetchBlogs();
    } catch (err) {
      if (!axios.isAxiosError(err)) throw err;

      const errors: SubmitFormError[] = err.response?.data;
      dispatch({ type: "submit_form_errors", payload: { errors } });
      notifyToast(err.message, "error");
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BlogForm
      handleSubmit={handleSubmit}
      isLoading={loading}
      state={state}
      closeModal={closeModal}
      operation="EDIT"
      dispatch={dispatch}
    />
  );
}

export default EditBlog;
