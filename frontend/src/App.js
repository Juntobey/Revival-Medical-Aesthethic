import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import VirtualClinic from "./pages/VirtualClinic";
import MoreInformation from "./pages/MoreInformation.jsx";
import ContactUs from "./pages/ContactUs";
import PrivateRoute from "./components/PrivateRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import DoctorRoute from "./components/DoctorRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ViewTreatments from "./pages/ViewTreatments";
import BackgroundWrapper from "./components/Style/BackgroundWrapper.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import MainClinic from "./pages/MainClinic.jsx";
import Booking from "./pages/Booking.jsx";
import PaymentOptions from "./pages/PaymentOptions.jsx";
import HomePage from "./pages/HomePage.jsx";
import Fallback from "./pages/Fallback";
import BASE_URL from "./config.js";

const App = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaintenanceMode = async () => {
      try {
        const response = await fetch(`${BASE_URL}/maintenance`);
        const data = await response.json();
        setMaintenanceMode(data.is_active);
      } catch (error) {
        console.error("Error fetching maintenance mode:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaintenanceMode();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (maintenanceMode) {
    return <Fallback />;
  }

  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}

          <Route path="/view-treatments" element={<ViewTreatments />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/payment-options" element={<PaymentOptions />} />
          <Route path="*" element={<Fallback />} />

          <Route
            path="/aesthetics-clinic"
            element={
              <BackgroundWrapper>
                <MainClinic />
              </BackgroundWrapper>
            }
          />
          <Route
            path="/virtual-clinic"
            element={
              <BackgroundWrapper>
                <VirtualClinic />
              </BackgroundWrapper>
            }
          />
          <Route path="/more-information" element={<MoreInformation />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route
            path="/forgot-password"
            element={
              <BackgroundWrapper>
                <ForgotPassword />
              </BackgroundWrapper>
            }
          />

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
