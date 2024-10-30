import { Appbar } from "./AppBar";
import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";

const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full pt-200 max-w-screen-xl pt-12 gap-4">
          <div className="col-span-8">
            <div className="text-4xl font-extrabold ">{blog.title}</div>
            <div className="text-slate-500 text-sm pt-3">
              Posted on 27 Oct 2024
            </div>
            <div className="text-gray-500 text-md pt-3">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-700 font-semibold">Author</div>

            <div className="flex gap-2 ">
              <div className="flex items-center pr-4">
                <Avatar size="big" name={blog.author.name || "Anonymous"} />
              </div>

              <div>
                <div className="text-2xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-1 text-slate-500">
                  this is random catch phrase about authors ability to grab
                  users attention{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
