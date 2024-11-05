// src/pages/DoctorDashboard.jsx
import React, { useContext } from "react";
import Header from "../components/Includes/Header";
import Footer from "../components/Includes/Footer";
import AppointmentManagement from "../components/DoctorDashboard/AppointmentManagement";
import PatientInfo from "../components/DoctorDashboard/PatientInfo";
import ScheduleManagement from "../components/DoctorDashboard/ScheduleManagement";
import Notifications from "../components/DoctorDashboard/Notifications";
import DoctorAnalytics from "../components/DoctorDashboard/DoctorAnalytics";
import { AuthContext } from "../context/AuthContext";

const DoctorDashboard = () => {
  const { auth } = useContext(AuthContext);
  const userName = auth.user ? auth.user.username : "User";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-8">
        {/* Hero Section */}
        <div className="bg-blue-50 rounded-lg shadow-lg p-8 mb-8">
          <h1 className="text-4xl font-bold text-darkgreen">
            Welcome, Dr. {userName}
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Your dashboard allows you to efficiently manage your schedule,
            access patient information, and communicate with patients. Review
            upcoming appointments, update patient records, and organize your
            availability with ease.
          </p>
        </div>

        {/* Main Dashboard Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AppointmentManagement />
          <PatientInfo />
          <ScheduleManagement />
          <Notifications />
          <DoctorAnalytics />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DoctorDashboard;
