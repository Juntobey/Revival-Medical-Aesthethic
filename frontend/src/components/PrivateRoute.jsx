// src/components/PrivateRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { auth, loading } = useContext(AuthContext);

  // Delay rendering until loading is complete
  if (loading) return <div>Loading...</div>; // Optionally, display a loading spinner here

  return auth.isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
