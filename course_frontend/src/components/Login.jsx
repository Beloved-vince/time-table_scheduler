import React, { useState } from "react";
import bg from "../assets/bg-t1.jpg";
import { Link } from "react-router-dom";

const Login = () => {
  const styles = {
    backgroundImage: `url(${bg})`,
  };
  const [data, setData] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const base_url = "http://127.0.0.1:8000";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // make the api call to ubmit form
      const res = await fetch(`${base_url}/login`, {
        method: "POST",
        body: data,
        headers: { "Content-Type": "application/json" },
      });
      const token_data = await res.json();
      console.log(token_data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen w-full items-center flex justify-between">
      <form
        onSubmit={handleSubmit}
        className="px-12 w-1/2 grid grid-cols-[auto,1fr] items-center gap-y-6 gap-x-2 p-5 box-border"
      >
        <h2 className="col-span-2 text-4xl py-2 font-semibold text-[#1560bd]">
          Login Form
        </h2>

        <label htmlFor="email" className="w-fit">
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
        <label htmlFor="password" className="w-fit">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          defaultValue={data.password}
          onChange={handleChange}
          required
          className="border border-[#d9d9d9] py-4 outline-none px-2 w-full rounded-full"
        />

        <button className="col-span-2 outline-none w-full py-5 bg-[#1560bd] text-white shadow-lg rounded-full">
          Login
        </button>
      </form>

      <div
        className="w-1/2 h-full rounded-l-xl flex flex-col gap-2 justify-center items-center  bg-blend-overlay bg-[#1560bd]"
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
    </div>
  );
};

export default Login;
