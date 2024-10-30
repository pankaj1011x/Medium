import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string;
  publishedDate: string;
  title: string;
  content: string;
  id: string;
}

export function BlogCard({
  id,
  authorName,
  publishedDate,
  title,
  content,
}: BlogCardProps) {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b-2 border-slate-200 w-screen max-w-screen-md cursor-pointer  ">
        <div className="flex items-center">
          <div className="flex items-center align-center">
            <Avatar name={authorName} />
          </div>
          <div className="font-extralight ml-1 text-xs">{authorName}</div>
          <div className="mx-1">
            <Circle />
          </div>
          <span className="text-slate-400 text-xs font-extralight">
            {" "}
            {publishedDate}
          </span>
        </div>
        <div className="font-semibold">{title}</div>
        <div className="text-md font-thin">
          {content.length > 100 ? content.slice(0, 100) + "..." : content}
        </div>
        <div className=" text-slate-400 text-xs pt-4">{`${Math.ceil(
          content.length / 100
        )} minutes read`}</div>
      </div>
    </Link>
  );
}
export function Circle() {
  return <div className=" h-1 w-1 dark:bg-gray-600 rounded-full"></div>;
}

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${
        size === "small" ? "w-6 h-6" : "w-10 h-10"
      }`}
    >
      <span
        className={`${
          size === "small" ? "text-xs" : "text-md"
        } text-gray-600 dark:text-gray-300`}
      >
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}
