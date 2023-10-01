import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import checkAuth from "../utils/checkAuth";
import axios from "axios";
import BlogType from "../types/Blog";
import Blog from "./Blog";
import DeleteModal from "./DeleteModal";

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
      const res = await axios.delete(
        "http://localhost:3000/api/blogs/" + blogId
      );

      console.log(await res.data);
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

      const res = await axios.get("http://localhost:3000/api/blogs");
      const allBlogs = res.data;
      setBlogs(allBlogs);
    })();
  }, [navigate]);

  return (
    <div className="flex flex-col p-8 w-full max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        {blogs.map((blog) => {
          return <Blog key={blog._id} blog={blog} onOpenModal={openModal} />;
        })}
      </div>

      <DeleteModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        onDeleteBlog={handleDeleteBlog}
        targetBlog={targetBlog}
        customStyles={customStyles}
      />
    </div>
  );
}

export default Blogs;