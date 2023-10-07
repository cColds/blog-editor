import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import checkAuth from "../utils/checkAuth";
import axios from "axios";
import BlogType from "../types/Blog";
import Blog from "../components/Blog";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

function Blogs() {
  const [blogs, setBlogs] = useState<BlogType[] | []>([]);
  const [targetBlog, setTargetBlog] = useState<BlogType | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const navigate = useNavigate();

  const openDeleteModal = (blog: BlogType) => {
    setIsDeleteModalOpen(true);
    setTargetBlog(blog);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTargetBlog(null);
  };

  const openEditModal = (blog: BlogType) => {
    setIsEditModalOpen(true);
    setTargetBlog(blog);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setTargetBlog(null);
  };

  const fetchBlogs = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/blogs");
      const allBlogs = res.data;
      setBlogs(allBlogs);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const isLoggedIn = await checkAuth();

      if (!isLoggedIn) {
        navigate("/");
      }

      fetchBlogs();
    })();
  }, [navigate, fetchBlogs]);

  return (
    <div className="flex w-full max-w-7xl flex-col p-8">
      <div className="mb-6 flex items-baseline gap-5">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <Link to="/new-blog" className="inline-flex items-center gap-2 text-xl">
          <FontAwesomeIcon icon={faPenToSquare} />
          New Blog
        </Link>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        {blogs.map((blog) => {
          return (
            <Blog
              key={blog._id}
              blog={blog}
              onOpenDeleteModal={openDeleteModal}
              onOpenEditModal={openEditModal}
            />
          );
        })}
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          isModalOpen={isDeleteModalOpen}
          closeModal={closeDeleteModal}
          targetBlog={targetBlog}
          customStyles={customStyles}
          fetchBlogs={fetchBlogs}
        />
      )}

      {isEditModalOpen && (
        <EditModal
          isModalOpen={isEditModalOpen}
          closeModal={closeEditModal}
          targetBlog={targetBlog}
          customStyles={customStyles}
          fetchBlogs={fetchBlogs}
        />
      )}
    </div>
  );
}
export default Blogs;
