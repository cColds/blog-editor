import { Link } from "react-router-dom";
import BlogType from "../types/Blog";

function BlogCard({
  blog,
  onOpenDeleteModal,
  onOpenEditModal,
}: {
  blog: BlogType;
  onOpenDeleteModal: (blog: BlogType) => void;
  onOpenEditModal: (blog: BlogType) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-end gap-2 text-sm">
        <button
          className="border-0 bg-red-800 transition ease-in-out hover:bg-red-900"
          onClick={() => onOpenDeleteModal(blog)}
        >
          Delete
        </button>
        <button
          onClick={() => {
            onOpenEditModal(blog);
          }}
        >
          Edit
        </button>
      </div>

      <article className="flex flex-col gap-2">
        <Link to={`/blogs/${blog._id}`}>
          <img
            src={blog.imgUrl}
            alt="image"
            className="aspect-video object-cover"
          />
        </Link>
        <h2 className="text-2xl font-bold">{blog.title}</h2>
        <div className="flex gap-2">
          <p>{blog.author.username}</p> ·{" "}
          <p title={blog.formatDateTitle}>{blog.formatDate}</p>
          {blog.published ? (
            <span className="ml-auto rounded-full bg-green-600/50 px-2 py-1 text-sm">
              <p className="text-green-200">Published</p>
            </span>
          ) : (
            <span className="ml-auto rounded-full bg-red-600/50 px-2 py-1 text-sm">
              <p className="text-red-200">Unpublished</p>
            </span>
          )}
        </div>
        <p className="line-clamp text-sm text-slate-300">{blog.body}</p>
      </article>
    </div>
  );
}

export default BlogCard;
