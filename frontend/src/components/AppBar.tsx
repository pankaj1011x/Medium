import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export const Appbar = () => {
  return (
    <div className="border-b h-16 flex justify-between px-10 items-center">
      <Link to={"/blogs"} className="cursor-pointer">
        Medium
      </Link>

      <div>
        <Link to={`/publish`}>
          <button
            type="button"
            className=" mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Publish
          </button>
        </Link>

        <Avatar size="big" name="Pankaj" />
      </div>
    </div>
  );
};
