import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import checkAuth from "../utils/checkAuth";

type BlogType = {
  _id: string;
  imgUrl: string;
  title: string;
  body: string;
  author: { _id: string; username: string };
  formatDate: string;
  formatDateTitle: string;
  comments: {
    formatDate: string;
    formatDateTitle: string;
    email: string;
    message: string;
    name: string;
    _id: string;
  }[];
  published: boolean;
};

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
    maxWidth: "450px",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

function Blogs() {
  const [blogs, setBlogs] = useState<BlogType[] | []>([]);
  const [targetBlog, setTargetBlog] = useState<BlogType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleDeleteBlog = async () => {
    const blogId = targetBlog?._id || "";
    console.log(blogId);
    try {
      const res = await fetch("http://localhost:3000/api/blogs/" + blogId, {
        method: "DELETE",
      });

      console.log(await res.text());
    } catch (e) {
      console.error(e);
    }
  };

  const openModal = (blog: BlogType) => {
    setIsModalOpen(true);
    setTargetBlog(blog);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTargetBlog(null);
  };

  useEffect(() => {
    (async () => {
      const isLoggedIn = await checkAuth();

      if (!isLoggedIn) {
        navigate("/");
      }

      const res = await fetch("http://localhost:3000/api/blogs");
      const allBlogs = await res.json();
      setBlogs(allBlogs);
    })();
  }, [navigate]);

  return (
    <div className="flex flex-col p-8 w-full max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        {blogs.map((blog) => {
          return (
            <div className="flex flex-col gap-2" key={blog._id}>
              <div className="flex gap-2 justify-end text-sm">
                <button
                  className="bg-red-800 border-0 hover:bg-red-900 transition ease-in-out"
                  onClick={() => openModal(blog)}
                >
                  Delete
                </button>
                <button>Edit</button>
              </div>

              <article className="flex flex-col gap-2">
                <Link to={`/blogs/${blog._id}`}>
                  <img
                    src={blog.imgUrl}
                    alt="image"
                    className="object-cover aspect-video"
                  />
                </Link>
                <h2 className="text-2xl font-bold">{blog.title}</h2>
                <div className="flex gap-2">
                  <p>{blog.author.username}</p> ·{" "}
                  <p title={blog.formatDateTitle}>{blog.formatDate}</p>
                  {blog.published ? (
                    <span className="bg-green-600/50 rounded-full py-1 px-2 text-sm ml-auto">
                      <p className="text-green-200">Published</p>
                    </span>
                  ) : (
                    <span className="bg-red-600/50 rounded-full py-1 px-2 text-sm ml-auto">
                      <p className="text-red-200">Unpublished</p>
                    </span>
                  )}
                </div>
                <p className="line-clamp text-sm text-slate-300">{blog.body}</p>
              </article>
            </div>
          );
        })}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Delete Modal"
      >
        <h1 className="text-xl mb-2">Delete Modal</h1>

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
                await handleDeleteBlog();
                closeModal();
                navigate(0);
              }}
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Blogs;
