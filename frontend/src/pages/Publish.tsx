import React, { ChangeEvent, useState } from "react";

import { Appbar } from "../components/AppBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <Appbar />
      <div className="flex justify-center pt-10 ">
        <div className="max-w-screen-lg w-full mt-10 ">
          <input
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="title"
          />
          <TextEditor
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <button
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog`,
                {
                  title,
                  content,
                },
                {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                }
              );
              navigate(`/blog/${response.data.id}`);
            }}
            type="submit"
            className=" mt-3 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};

function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <div className="w-full mb-4 border-b ">
        <div className="flex items-center justify-between  py-2 border-b ">
          <div className=" py-2 bg-white rounded-b-lg w-full ">
            <label className="sr-only">Publish post</label>
            <textarea
              onChange={onChange}
              id="editor"
              rows={9}
              className=" outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 "
              placeholder="Write an article..."
              required
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Publish;
