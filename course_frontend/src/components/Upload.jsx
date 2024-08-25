import axios from "axios";
import React, { useState } from "react";
import Toast from "./Toast";
import { Link } from "react-router-dom";
import isAuthContext from "../utils/authContext";

const Upload = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [msg, setMsg] = useState("");
  const base_url = "http://127.0.0.1:8000/v1/api";

  const { logout } = isAuthContext();
  const handleFileUpload = async (e) => {
    e.preventDefault();

    if (!uploadedFile) {
      alert("Please select a file first.");
      return;
    }

    const allowedTypes = [
      "text/plain",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (!allowedTypes.includes(uploadedFile.type)) {
      alert("Invalid file type. Please upload a .txt or .xlsx file.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);

      const res = await axios.post(`${base_url}/upload/`, formData, {
        headers: {
          "Content-Type": "multi-part/formdata",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setMsg(res.data?.message);
      setTimeout(() => {
        setMsg("");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      {msg ? <Toast message={msg} /> : null}
      <nav className="absolute top-5 right-5 space-x-3">
        <Link to="/">Home</Link>
        <button onClick={() => logout()}>Logout</button>
      </nav>
      <h2 className="text-[#1a1a1a] text-4xl py-5 text-center">
        Upload your course allocation File
      </h2>
      <form
        className="w-full md:w-1/2 gap-2 bg-[#d9d9d9]/20 shadow h-[24rem] rounded-lg flex flex-col justify-center items-center"
        onSubmit={handleFileUpload}
      >
        <input
          type="file"
          accept=".txt, .xlsx"
          id="upload"
          name="file"
          onChange={(e) => setUploadedFile(e.target.files[0])}
        />
        <label htmlFor="upload">Select File</label>
        <button className="w-1/2 py-5 bg-[#1560bd] text-white shadow-lg rounded-full">
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;
