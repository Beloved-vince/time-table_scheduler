import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import SignUp from "./components/SignUp.jsx";
import Login from "./components/Login.jsx";
import Upload from "./components/Upload.jsx";

const token = localStorage.getItem("accessToken");
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signup",
    element: token ? <Navigate to="/upload" /> : <SignUp />,
  },
  {
    path: "/login",
    element: token ? <Navigate to="/upload" /> : <Login />,
  },
  {
    path: "/upload",
    element: token ? <Upload /> : <Navigate to="/login" />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
