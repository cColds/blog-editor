import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";
import axios from "axios";
import checkAuth from "../utils/checkAuth";
import BlogType from "../types/Blog";
import BlogCard from "../components/BlogCard";
import DeleteModal from "../components/DeleteModal";
import EditModal from "../components/EditModal";
import Loading from "../components/Loading";

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
  const [loading, setLoading] = useState(true);

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
    setLoading(true);

    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/blogs`);
      const allBlogs = res.data;
      setBlogs(allBlogs);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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

  if (loading) return <Loading loading={loading} />;

  return (
    <div className="flex w-full max-w-7xl flex-col p-8">
      <div className="mb-6 flex items-baseline gap-5">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <Link
          to="/create-blog"
          className="inline-flex items-center gap-2 text-xl"
        >
          <FontAwesomeIcon icon={faPenToSquare} />
          Create Blog
        </Link>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
        {blogs.map((blog) => {
          return (
            <BlogCard
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
