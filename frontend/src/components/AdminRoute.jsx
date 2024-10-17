// src/components/AdminRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  // If the user is authenticated and is an admin, render the children component
  return auth.isAuthenticated && auth.role === "admin" ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoute;
