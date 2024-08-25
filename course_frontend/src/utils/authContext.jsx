import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const access = localStorage.getItem("accessToken");
  const isAuthenticated = access ? true : false;

  const [isAuth, setIsAuth] = useState(isAuthenticated);

  useEffect(() => {
    if (access) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, []);
  const login = () => {
    setIsAuth(true);
  };
  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuth(false);
  };
  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const isAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("Can only be used in wrapped component");
  }
  return context;
};
export default isAuthContext;
