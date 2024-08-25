import React from "react";

const Toast = ({ message }) => {
  return (
    <div className="py-4 px-2 border rounded-b-md bg-white shadow border-blue-400 absolute top-0 flex items-center gap-2 animate-toast">
      <span className="text-green-600">
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-circle-check"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </span>{" "}
      <span className="text-[#1a1a1a]">{message}</span>
    </div>
  );
};

export default Toast;
