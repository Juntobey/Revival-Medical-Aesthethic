// src/pages/AdminDashboard.jsx
import React from "react";
import Header from "../components/Includes/Header";
import Footer from "../components/Includes/Footer";
import ManageUsers from "../components/AdminDashboard/ManageUsers";
import ManageNotifications from "../components/AdminDashboard/ManageNotifications";
import ManageSchedule from "../components/AdminDashboard/ManageSchedule";
import TreatmentGalleryManagement from "../components/AdminDashboard/TreatmentGalleryManagement";
import AnalyticsOverview from "../components/AdminDashboard/AnalyticsOverview";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4 md:p-8">
        <h1 className="text-4xl font-bold text-darkgreen mb-8">
          Admin Dashboard
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnalyticsOverview />
          <ManageUsers />
          <ManageNotifications />
          <ManageSchedule />
          <TreatmentGalleryManagement />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
