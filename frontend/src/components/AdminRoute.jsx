// src/components/AdminRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { auth, loading } = useContext(AuthContext);

  // Show loading spinner while verifying auth state
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );

  // If the user is authenticated and is an admin, render the children component
  return auth.isAuthenticated && auth.user.role === "admin" ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoute;
