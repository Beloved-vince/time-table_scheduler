import React, { useEffect } from "react";
import isAuthContext from "./utils/authContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuth } = isAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login", { replace: true });
    }
  }, [isAuth, navigate]);
  return <>{isAuth ? children : null}</>;
};
export default ProtectedRoute;
