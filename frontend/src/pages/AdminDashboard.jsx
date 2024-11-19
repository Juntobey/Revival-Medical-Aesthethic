import React from "react";
import Header from "../components/Includes/Header";
import Footer from "../components/Includes/Footer";
import ManageUsers from "../components/AdminDashboard/ManageUsers";
import ManageSchedule from "../components/AdminDashboard/ManageSchedule";
import TreatmentGalleryManagement from "../components/AdminDashboard/TreatmentGalleryManagement";
import AnalyticsOverview from "../components/AdminDashboard/AnalyticsOverview";
import ManageBookings from "../components/AdminDashboard/ManageBookings";
import Notifications from "../components/DoctorDashboard/Notifications";
import WebsiteSettings from "../components/AdminDashboard/WebsiteSettings";

const AdminDashboard = () => {
  return (
    <>
      <Header />

      <main className="container mx-auto px-4 p-8 md:pt-[100px] pt-[60px] min-h-screen bg-almond">
        {/* Hero Section */}
        <section className="bg-brown-200 rounded-lg shadow-lg p-6 md:p-8 mb-6 lg:mb-8 text-center lg:text-left">
          <h1 className="md:text-3xl  lg:text-h2 font-bold font-headers text-darkgreen">
            Welcome to the Admin Dashboard
          </h1>
        </section>

        {/* Main Dashboard Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <AnalyticsOverview />
          <ManageUsers />
          <Notifications />
          <ManageSchedule />
          <TreatmentGalleryManagement />
          <ManageBookings />
          <WebsiteSettings />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AdminDashboard;
