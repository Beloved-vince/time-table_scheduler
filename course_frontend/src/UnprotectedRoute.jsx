import { useEffect } from "react";
import isAuthContext from "./utils/authContext";
import { useNavigate } from "react-router-dom";
const UnprotectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuth } = isAuthContext();
  useEffect(() => {
    if (isAuth) {
      navigate("/upload", { replace: true });
    }
  }, []);
  return children;
};
export default UnprotectedRoute;
