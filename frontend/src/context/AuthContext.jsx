// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    role: null,
  });
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    const role = localStorage.getItem("role");

    if (token && user && role) {
      setAuth({
        isAuthenticated: true,
        user,
        role,
      });
    } else {
      localStorage.clear();
      setAuth({ isAuthenticated: false, user: null, role: null });
    }

    setLoading(false); // Set loading to false after verifying
  }, []);

  const signIn = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("role", result.user.role);

        setAuth({
          isAuthenticated: true,
          user: result.user,
          role: result.user.role,
        });

        return { success: true, role: result.user.role };
      } else {
        setError(result.error || "Login failed, please try again.");
        return { success: false };
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Login failed, please try again.");
      return { success: false };
    }
  };

  const signOut = () => {
    setAuth({ isAuthenticated: false, user: null, role: null });
    localStorage.clear();
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ auth, signIn, signOut, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
