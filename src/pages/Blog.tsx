import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogType from "../types/Blog";
import Comment from "../components/Comment";
import Loading from "../components/Loading";

function Blog() {
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [loading, setLoading] = useState(true);
  const { blogId } = useParams();

  const fetchBlog = useCallback(async () => {
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:3000/api/blogs/${blogId}`);

      const targetBlog = await res.json();
      setBlog(targetBlog);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [blogId]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  if (loading) return <Loading loading={loading} />;

  return (
    <div>
      {blog && (
        <article className="flex w-full max-w-3xl flex-col p-8">
          <div className="mb-8 flex flex-col gap-4">
            <h1 className="font-inter-bold text-4xl">{blog.title}</h1>
            <div className="flex gap-2">
              <p>{blog.author.username}</p> •{" "}
              <p className="text-slate-300" title={blog.formatDateTitle}>
                {blog.formatDate}
              </p>
            </div>

            <img src={blog.imgUrl} alt="image" className="aspect-video" />
          </div>

          <p className="mb-8 text-lg">{blog.body}</p>

          <Comment blog={blog} fetchBlog={fetchBlog} />
        </article>
      )}
    </div>
  );
}

export default Blog;
