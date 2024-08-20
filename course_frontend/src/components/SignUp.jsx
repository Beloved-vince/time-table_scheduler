import React, { useState } from "react";
import bg from "../assets/bg-t1.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const styles = {
    backgroundImage: `url(${bg})`,
  };
  const navigate = useNavigate();
  const base_url = "http://127.0.0.1:8000/v1/api";
  const [data, setData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await axios.post(`${base_url}/signup/`, data);
      setMsg(res.data?.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setErr(error?.response?.data?.error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="h-screen w-full items-start flex flex-col md:flex-row-reverse justify-between">
      <div
        className="w-full md:w-1/2 h-full py-5 rounded-l-xl flex flex-col gap-2 justify-center items-center  bg-blend-overlay bg-[#1560bd]"
        style={styles}
      >
        <p className="text-4xl text-white font-semibold">Welcome, Sign Up</p>
        <p className="text-white font-bold">Already have an account?</p>
        <Link
          to="/login"
          className="px-8 text-white font-semibold py-3 bg-transparent border-2 border-white rounded-full"
        >
          Login
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="px-2 w-full flex flex-col md:w-1/2  space-y-6 gap-x-2 md:p-5 box-border"
      >
        {err ? (
          <span className="px-2 py-3 text-red-600 border-l-4 border-red-600 bg-red-500/10">
            {err}
          </span>
        ) : null}
        <h2 className="text-3xl text-center md:text-4xl py-2 font-semibold text-[#1560bd]">
          Registration Form
        </h2>
        <div className="flex flex-col md:flex-row md:items-center gap-1 w-full">
          <label
            htmlFor="firstname"
            className="text-left whitespace-nowrap min-w-[11rem]"
          >
            Full name
          </label>
          <input
            type="text"
            id="firstname"
            defaultValue={data.full_name}
            name="full_name"
            onChange={handleChange}
            required
            className="border border-[#d9d9d9] py-4 outline-none px-2 w-full rounded-full"
          />
        </div>
        {/* <div className="flex flex-col md:flex-row md:items-center gap-1">
          <label
            htmlFor="lastname"
            className="text-left whitespace-nowrap min-w-[11rem]"
          >
            Last name
          </label>
          <input
            type="text"
            id="lastname"
            defaultValue={data.lastname}
            name="lastname"
            onChange={handleChange}
            required
            className="border border-[#d9d9d9] py-4 outline-none px-2 w-full rounded-full"
          />
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-1">
          {" "}
          <label
            htmlFor="middlename"
            className="text-left whitespace-nowrap min-w-[11rem] "
          >
            Middle name
          </label>
          <input
            type="text"
            id="middlename"
            defaultValue={data.middlename}
            name="middlename"
            onChange={handleChange}
            className="border border-[#d9d9d9] py-4 outline-none px-2 w-full rounded-full"
          />
        </div> */}
        <div className="flex flex-col md:flex-row md:items-center gap-1 w-full">
          {" "}
          <label
            htmlFor="email"
            className="text-left whitespace-nowrap min-w-[11rem]"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            defaultValue={data.email}
            name="email"
            onChange={handleChange}
            required
            className="border border-[#d9d9d9] py-4 outline-none px-2 w-full rounded-full"
          />
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-1">
          {" "}
          <label
            htmlFor="password"
            className="text-left whitespace-nowrap min-w-[11rem]"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            defaultValue={data.password}
            name="password"
            onChange={handleChange}
            required
            className="border border-[#d9d9d9] py-4 outline-none px-2 w-full rounded-full"
          />
        </div>
        <div className="flex flex-col md:flex-row md:items-center gap-1">
          {" "}
          <label
            htmlFor="confirm_password"
            className="text-left whitespace-nowrap min-w-[11rem]"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm_password"
            defaultValue={data.confirm_password}
            name="confirm_password"
            onChange={handleChange}
            required
            className="border border-[#d9d9d9] py-4 outline-none px-2 w-full rounded-full"
          />
        </div>

        <button className="w-1/2 mx-auto flex justify-center  items-center py-5 bg-[#1560bd] text-white shadow-lg rounded-full">
          {isLoading ? (
            <span className="animate-spin">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-loader"
              >
                <path d="M12 2v4" />
                <path d="m16.2 7.8 2.9-2.9" />
                <path d="M18 12h4" />
                <path d="m16.2 16.2 2.9 2.9" />
                <path d="M12 18v4" />
                <path d="m4.9 19.1 2.9-2.9" />
                <path d="M2 12h4" />
                <path d="m4.9 4.9 2.9 2.9" />
              </svg>
            </span>
          ) : (
            "Sign Up"
          )}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
