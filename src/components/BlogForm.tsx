import React, { useState } from "react";
import BlogType from "../types/Blog";
import axios from "axios";
import CircleSpinner from "./CircleSpinner";

type FormError = {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
};

type AllowedErrorKeys = "title" | "body" | "published" | "image";

function BlogForm({
  closeModal,
  targetBlog,
  fetchBlogs,
}: {
  closeModal: () => void;
  targetBlog: BlogType | null;
  fetchBlogs: () => Promise<void>;
}) {
  const [title, setTitle] = useState(targetBlog?.title || "");
  const [body, setBody] = useState(targetBlog?.body || "");
  const [published, setPublished] = useState(Boolean(targetBlog?.published));
  const [image, setImage] = useState<null | File>(null);
  const [errors, setErrors] = useState<
    { [k in AllowedErrorKeys]?: FormError } | Record<string, never>
  >({});
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files?.length) {
      try {
        setImage(files[0]);
      } catch (e) {
        console.error(e);
      }
    } else {
      setImage(null);
    }
    handleErrors(e);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    handleErrors(e);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(e.target.value);
    handleErrors(e);
  };

  const handlePublishedChange = () => setPublished(!published);

  const handleEditBlog = async () => {
    if (targetBlog == null) throw new Error("Can't edit blog of type null");

    setIsLoading(true);

    try {
      const blogId = targetBlog._id;
      const formData = new FormData();
      formData.append("title", title);
      formData.append("body", body);
      formData.append("published", published.toString());
      if (image) formData.append("image", image);
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

      setErrors({});
      closeModal();
      fetchBlogs();
    } catch (err) {
      if (!axios.isAxiosError(err)) throw err;

      const errors = err.response?.data;
      console.error(err.message);

      if (errors) {
        const errorsList: { [key: string]: FormError } = {};

        errors.forEach((error: FormError) => {
          errorsList[error.path] = error;
        });

        setErrors(errorsList);
      }

      console.error(err instanceof Error && err);
    } finally {
      setIsLoading(false);
    }
  };

  const getError = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    switch (e.target.name) {
      case "title":
      case "body": {
        if (!e.target.value.trim()) return `${e.target.name} cannot be empty`;

        break;
      }

      case "image": {
        if (!(e.target instanceof HTMLInputElement)) return;
        const { files } = e.target;
        if (!files?.length) return "Image is required";

        if (!files[0].name.match(/\.(jpg|jpeg|png|avif|webp)$/i))
          return "File extension must be .webp, .png, .jpg/jpeg, or .avif";

        break;
      }

      default:
        console.log("No errors found");
    }

    return false;
  };

  const handleErrors = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const errorMsg = getError(e);
    if (!errorMsg) {
      const updatedErrors = structuredClone(errors);
      delete updatedErrors[e.target.name];
      setErrors(updatedErrors);

      return;
    }

    const errorField = {
      type: "field",
      value: e.target.value,
      msg: errorMsg,
      path: e.target.name,
      location: "body",
    };

    setErrors({ ...errors, [e.target.name]: errorField });
  };

  return (
    <form
      encType="multipart/form-data"
      onSubmit={(e) => {
        e.preventDefault();
        handleEditBlog();
      }}
    >
      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1.5">
          Title
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </label>
        {errors.title && (
          <p className="text-sm text-red-600 first-letter:uppercase">
            {errors.title.msg}
          </p>
        )}

        <label className="flex flex-col gap-1.5">
          Body
          <textarea
            name="body"
            placeholder="Body"
            rows={4}
            value={body}
            onChange={handleBodyChange}
            required
          ></textarea>
        </label>
        {errors.body && (
          <p className="text-sm text-red-600 first-letter:uppercase">
            {errors.body.msg}
          </p>
        )}

        <label className="flex gap-2.5">
          Published?
          <input
            type="checkbox"
            title="Published?"
            className="scale-125"
            checked={published}
            onChange={handlePublishedChange}
          />
        </label>
        {errors.published && (
          <p className="text-sm text-red-600 first-letter:uppercase">
            {errors.published.msg}
          </p>
        )}

        <label className="flex flex-col gap-2.5">
          Blog Image
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full p-0 text-sm text-slate-300 file:mr-4 file:rounded-full file:border-0 
            file:bg-violet-50 file:px-4 file:py-2 file:text-sm file:font-semibold 
            file:text-violet-700 hover:file:bg-violet-100"
            title="image"
            name="image"
            accept="image/avif, image/jpeg, image/png, image/webp"
            required
          />
        </label>
        {errors.image && (
          <p className="text-sm text-red-600 first-letter:uppercase">
            {errors.image.msg}
          </p>
        )}

        <div className="mt-4 flex flex-col gap-4">
          <div className="ml-auto flex gap-2 text-sm">
            <button className="bg-transparent" onClick={closeModal}>
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center border-0 bg-red-800 font-semibold transition ease-in-out hover:bg-red-900 disabled:opacity-80"
            >
              {isLoading && <CircleSpinner />}
              Save
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default BlogForm;
