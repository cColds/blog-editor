import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

function Blogs() {
  const [blogs, setBlogs] = useState<BlogType[] | []>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const isLoggedIn = await checkAuth();

      if (!isLoggedIn) {
        navigate("/");
      }

      const res = await fetch("http://localhost:3000/api/blogs");
      const allBlogs = await res.json();
      console.log(allBlogs);
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
                <button className="bg-red-800 border-0">Delete</button>
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
    </div>
  );
}

export default Blogs;
