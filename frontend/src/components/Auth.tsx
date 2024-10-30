import { SignupInput } from "@pankaj1011m/medium-common";
import axios from "axios";
import React, { ChangeEvent, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostsInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data;

      localStorage.setItem("token", jwt.jwt);
      navigate("/blogs");
    } catch (err) {
      console.log("err");
    }
  }

  return (
    <div className="h-screen flex pt-24 flex-col items-center ">
      <div>
        <div className="mb-8 px-10">
          <div className="text-4xl font-bold">Create an account</div>
          <div className="text-gray-500">
            {type === "signup"
              ? "Already have an account?"
              : "Don't have an account?"}
            <Link
              className=" pl-2 underline"
              to={type === "signup" ? "/signin" : "/signup"}
            >
              {type === "signup" ? "Sign in" : "Sign up"}
            </Link>
          </div>
        </div>
        <div>
          {type === "signup" ? (
            <LabelledInput
              label="Name"
              placeholder="Pankaj Singh"
              onChange={(e) => {
                setPostsInputs({
                  ...postInputs,
                  name: e.target.value,
                });
              }}
            />
          ) : null}

          <LabelledInput
            label="Email"
            placeholder="pankajsingh@gmail.com"
            onChange={(e) => {
              setPostsInputs({
                ...postInputs,
                email: e.target.value,
              });
            }}
          />

          <LabelledInput
            label="Password"
            placeholder="1234"
            onChange={(e) => {
              setPostsInputs({
                ...postInputs,
                password: e.target.value,
              });
            }}
          />
          <div className="mt-5">
            <button
              onClick={sendRequest}
              type="button"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 w-full dark:border-gray-700"
            >
              {type == "signup" ? "Sign up" : "Sign in "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface labelinputTypes {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}
function LabelledInput({
  label,
  placeholder,
  onChange,
  type,
}: labelinputTypes) {
  return (
    <div>
      <div>
        <label className="block mb-2 text-sm font-semibold text-black pt-5">
          {label}
        </label>
        <input
          onChange={onChange}
          type={type || "text"}
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  );
}

export default Auth;
