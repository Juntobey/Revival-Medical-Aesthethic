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
    <>
      <Header />

      <main className="container mx-auto px-4 p-8 md:pt-[100px] pt-[60px] min-h-screen bg-almond">
        <section className="bg-brown-200 rounded-lg shadow-lg p-6 md:p-8 mb-6 lg:mb-8 text-center lg:text-left">
          <h1 className=" md:text-3xl lg:text-h2 text-[25px] font-bold font-headers text-darkgreen">
            Welcome, Dr. {userName}
          </h1>
          <p className="mt-2 md:mt-4 text-base md:text-lg text-p text-gray-700">
            Manage your schedule, access patient information, and communicate
            with patients efficiently. Review upcoming appointments, update
            records, and manage your availability.
          </p>
        </section>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <AppointmentManagement />
          <PatientInfo />
          <ScheduleManagement />
          <Notifications />
          <DoctorAnalytics />
        </div>
      </main>

      <Footer />
    </>
  );
};

export default DoctorDashboard;
