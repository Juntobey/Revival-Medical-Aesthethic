// src/components/DoctorRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const DoctorRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  // If the user is authenticated and is a doctor or admin, render the children component
  return auth.isAuthenticated &&
    (auth.role === "doctor" || auth.role === "admin") ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default DoctorRoute;
