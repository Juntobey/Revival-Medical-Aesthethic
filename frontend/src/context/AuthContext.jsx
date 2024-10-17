// src/context/AuthContext.jsx
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// Create the AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    role: null,
  });

  const navigate = useNavigate(); // To handle redirects

  // Sign in function
  const signIn = (user, role) => {
    setAuth({
      isAuthenticated: true,
      user: user,
      role: role,
    });

    // Redirect based on role after login
    if (role === "admin") {
      navigate("/admin-dashboard");
    } else if (role === "doctor") {
      navigate("/doctor-dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  // Sign out function
  const signOut = () => {
    setAuth({
      isAuthenticated: false,
      user: null,
      role: null,
    });
    navigate("/"); // Redirect to home after sign-out
  };

  return (
    <AuthContext.Provider value={{ auth, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider }; // Named exports
