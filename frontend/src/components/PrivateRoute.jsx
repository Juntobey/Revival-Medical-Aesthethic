// src/components/PrivateRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  // If the user is authenticated, render the children component
  return auth.isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
