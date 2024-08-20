import React, { useState, useEffect } from "react";
import bg from "../assets/bg-t1.jpg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const styles = {
    backgroundImage: `url(${bg})`,
  };

  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const base_url = "http://127.0.0.1:8000/v1/api";
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // make the api call to submit form
      const res = await fetch(`${base_url}/login/`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      const token_data = await res.json();

      localStorage.setItem("accessToken", token_data.access);
      localStorage.setItem("refreshToken", token_data.refresh);
      if (token_data.access) {
        navigate("/upload");
      }
      setErr(token_data?.detail);
    } catch (error) {
      console.log(error);
      setErr(error?.detail);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-full items-start flex flex-col md:flex-row-reverse justify-between">
      <div
        className="w-full md:w-1/2 h-full rounded-l-xl flex flex-col gap-2 justify-center items-center  bg-blend-overlay bg-[#1560bd]"
        style={styles}
      >
        <p className="text-4xl text-white font-semibold">Welcome, Login</p>
        <p className="text-white font-bold">Don't have an account?</p>
        <Link
          to={"/signup"}
          className="px-8 text-white font-semibold py-3 bg-transparent border-2 border-white rounded-full"
        >
          Sign up
        </Link>
      </div>
      <form
        onSubmit={handleSubmit}
        className="px-2 md:px-12 h-full relative w-full md:w-1/2 flex flex-col justify-center items-center  space-y-6 gap-x-2 p-5 box-border"
      >
        {err ? (
          <span className=" px-2 py-3 text-red-600 border-l-4 border-red-600 bg-red-500/10">
            {err}
          </span>
        ) : null}
        <h2 className="text-center text-4xl py-2 font-semibold text-[#1560bd]">
          Login Form
        </h2>

        <div className="flex flex-col md:flex-row md:items-center gap-1 w-full">
          <label
            htmlFor="email"
            className="text-left whitespace-nowrap min-w-[6rem]"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={data.email}
            name="email"
            onChange={handleChange}
            required
            className="border border-[#d9d9d9] py-4 outline-none px-2 w-full rounded-full"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-1 w-full">
          <label
            htmlFor="password"
            className="text-left whitespace-nowrap min-w-[6rem]"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            required
            className="border border-[#d9d9d9] py-4 outline-none px-2 w-full rounded-full"
          />
        </div>

        <button className=" flex justify-center mx-auto  items-center outline-none w-1/2 py-5 bg-[#1560bd] text-white shadow-lg rounded-full">
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
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
