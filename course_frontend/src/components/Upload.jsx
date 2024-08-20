import React, { useState } from "react";

const Upload = () => {
  const accessToken = localStorage.getItem("accessToken");
  const [uploadedFile, setUploadedFile] = useState(null);
  const base_url = "http://127.0.0.1:8000/v1/api";

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

      const res = await fetch(`${base_url}/upload/`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const response = await res.json();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
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
