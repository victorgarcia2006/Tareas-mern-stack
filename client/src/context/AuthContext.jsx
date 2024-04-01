import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../api/auth";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(true);
  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      //console.log(res.data)
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setError(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      //console.log(res.data)
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setError(error.response.data);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  }

  useEffect(() => {
    if (error.length > 0) {
      const timer = setTimeout(() => {
        setError([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        setUser(null);
        return;
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
        setLoading(false);
        setIsAuthenticated(true);
        setUser(res.data);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signup, signin, user, isAuthenticated, error, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
