import React, { useContext } from "react";
import Header from "../components/Includes/Header";
import Footer from "../components/Includes/Footer";
import QuickActions from "../components/Dashboard/QuickActions";
import Notifications from "../components/Dashboard/Notifications";
import UpcomingAppointments from "../components/Dashboard/UpcomingAppointments";
import PersonalInfo from "../components/Dashboard/PersonalInfo";
import Schedule from "../components/Dashboard/Schedule";
import TestimonialUpload from "../components/Dashboard/TestimonialUpload";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { auth } = useContext(AuthContext); // Accessing the auth context
  const userName = auth.user ? auth.user.username : "User"; // Display first name or "User"

  return (
    <>
      <Header />

      {/* Main Content Area with Top Padding */}
      <section className="container mx-auto p-6 pt-[120px] bg-almond">
        <h1 className="text-h2 font-headers font-bold mb-6 pb-[50px]">
          Welcome to Your Dashboard, {userName}
        </h1>

        {/* Grid Layout for Dashboard Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuickActions />
          <Notifications />
          <UpcomingAppointments />
          <PersonalInfo />
          <Schedule />
          <TestimonialUpload /> {/* Add Testimonial Upload */}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Dashboard;
