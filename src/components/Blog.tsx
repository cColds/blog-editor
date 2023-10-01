import { Link } from "react-router-dom";
import BlogType from "../types/Blog";

function Blog({
  blog,
  onOpenModal,
}: {
  blog: BlogType;
  onOpenModal: (blog: BlogType) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 justify-end text-sm">
        <button
          className="bg-red-800 border-0 hover:bg-red-900 transition ease-in-out"
          onClick={() => onOpenModal(blog)}
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
}

export default Blog;
