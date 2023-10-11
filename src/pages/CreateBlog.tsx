import { useEffect, useReducer, useState } from "react";
import checkAuth from "../utils/checkAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SubmitFormError from "../types/SubmitFormError";
import BlogForm from "../components/BlogForm";
import blogFormReducer from "../reducers/blogFormReducer";
import notifyToast from "../utils/notifyToast";

function CreateBlog() {
  const [state, dispatch] = useReducer(blogFormReducer, {
    title: "",
    description: "",
    body: "",
    published: false,
    image: null,
    errors: { title: "", description: "", body: "", image: "" },
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function redirectIfLoggedOut() {
      const loggedIn = await checkAuth();
      if (!loggedIn) navigate("/");
    }

    redirectIfLoggedOut();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (loading) return;

    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", state.title);
      formData.append("description", state.description);
      formData.append("body", state.body);
      formData.append("published", state.published.toString());
      formData.append("image", state.image || "");

      const token = localStorage.getItem("token");
      const config = {
        headers: { authorization: `Bearer ${token}` },
      };

      await axios.post("http://localhost:3000/api/blogs/", formData, config);
      notifyToast("Blog created successfully!", "success");

      navigate("/blogs");
    } catch (err) {
      if (!axios.isAxiosError(err)) throw err;

      const errors: SubmitFormError[] = err.response?.data;
      dispatch({ type: "submit_form_errors", payload: { errors } });
      notifyToast(err.message, "error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-6 text-3xl">Create Blog</h1>
      <BlogForm
        handleSubmit={handleSubmit}
        isLoading={loading}
        state={state}
        operation="CREATE"
        dispatch={dispatch}
      />
    </div>
  );
}

export default CreateBlog;
