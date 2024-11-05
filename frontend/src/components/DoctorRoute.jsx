// src/components/DoctorRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const DoctorRoute = ({ children }) => {
  const { auth, loading } = useContext(AuthContext);

  // Delay rendering until loading is complete
  if (loading) return null; // Optionally, display a loading spinner here

  return auth.isAuthenticated &&
    (auth.role === "doctor" || auth.role === "admin") ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default DoctorRoute;
