import React, { useState } from "react";
import bg from "../assets/bg-t1.jpg";
import { Link } from "react-router-dom";

const SignUp = () => {
  const styles = {
    backgroundImage: `url(${bg})`,
  };
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    middlename: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      // make the api call to ubmit form
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen w-full items-start flex justify-between">
      <form
        onSubmit={handleSubmit}
        className="px-12 w-1/2 grid grid-cols-[auto,1fr] items-center gap-y-6 gap-x-2 p-5 box-border"
      >
        <h2 className="col-span-2 text-4xl py-2 font-semibold text-[#1560bd]">
          Registration Form
        </h2>
        <label htmlFor="firstname" className="w-fit">
          First name
        </label>
        <input
          type="text"
          id="firstname"
          defaultValue={data.firstname}
          name="firstname"
          onChange={handleChange}
          required
          className="border border-[#d9d9d9] py-4 outline-none px-2 w-full rounded-full"
        />
        <label htmlFor="lastname" className="w-fit">
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
        <label htmlFor="middlename" className="w-fit">
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
          defaultValue={data.password}
          name="password"
          onChange={handleChange}
          required
          className="border border-[#d9d9d9] py-4 outline-none px-2 w-full rounded-full"
        />
        <label htmlFor="confirm_password" className="w-fit">
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

        <button className="col-span-2 w-full py-5 bg-[#1560bd] text-white shadow-lg rounded-full">
          Sign Up
        </button>
      </form>

      <div
        className="w-1/2 h-full rounded-l-xl flex flex-col gap-2 justify-center items-center  bg-blend-overlay bg-[#1560bd]"
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
    </div>
  );
};

export default SignUp;
