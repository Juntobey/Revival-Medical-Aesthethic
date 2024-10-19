import React from "react";
import Header from "../components/Includes/Header";
import Footer from "../components/Includes/Footer";

const DoctorDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-8">
        <h1 className="text-4xl font-bold">Doctor Dashboard</h1>
        <p className="mt-4 text-lg">
          Access your patients’ data and appointments here.
        </p>
      </main>
      <Footer />
    </div>
  );
};

export default DoctorDashboard;
