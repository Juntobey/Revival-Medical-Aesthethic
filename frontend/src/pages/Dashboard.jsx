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
  const { auth } = useContext(AuthContext);
  const userName = auth.user ? auth.user.username : "User";

  return (
    <>
      <Header />

      <main className="container mx-auto px-4 p-8 lg:pt-[100px] min-h-screen bg-almond">
        {/* Hero Section */}
        <section className="bg-luxwhite rounded-lg shadow-lg p-6 md:p-8 mb-6 lg:mb-8 text-center lg:text-left">
          <h1 className="text-2xl font-headers md:text-3xl lg:text-4xl font-bold">
            Welcome to Your Dashboard, {userName}
          </h1>
        </section>

        {/* Main Dashboard Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <QuickActions />
          <Notifications />
          <UpcomingAppointments />
          <PersonalInfo />
          <Schedule />
          <TestimonialUpload />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Dashboard;
