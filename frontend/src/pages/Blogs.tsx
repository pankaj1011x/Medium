import { useBlogs } from "../hooks";
import { Appbar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import BlogSkeleton from "../components/BlogSkeleton";

export function Blogs() {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div>
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name || "Anonymous "}
              publishedDate={"Oct 24,2024"}
              title={blog.title}
              content={blog.content}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
