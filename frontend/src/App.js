import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/AestheticsClinic";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AestheticsClinic from "./pages/AestheticsClinic";
import VirtualClinic from "./pages/VirtualClinic";
import MoreInformation from "./pages/MoreInformation.jsx";
import ContactUs from "./pages/ContactUs";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import DoctorRoute from "./components/DoctorRoute";
import { AuthProvider } from "./context/AuthContext";
import ViewTreatments from "./pages/ViewTreatments";
import BackgroundWrapper from "./components/BackgroundWrapper";
import ForgotPassword from "./pages/ForgotPassword.jsx";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}

          <Route path="/view-treatments" element={<ViewTreatments />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/aesthetics-clinic"
            element={
              <BackgroundWrapper>
                <AestheticsClinic />
              </BackgroundWrapper>
            }
          />
          <Route path="/virtual-clinic" element={<VirtualClinic />} />
          <Route path="/more-information" element={<MoreInformation />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/* Doctor Routes (Includes Admin Dashboard for Doctor Access) */}
          <Route
            path="/doctor-dashboard"
            element={
              <DoctorRoute>
                <DoctorDashboard />
              </DoctorRoute>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <DoctorRoute>
                <AdminDashboard />
              </DoctorRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
