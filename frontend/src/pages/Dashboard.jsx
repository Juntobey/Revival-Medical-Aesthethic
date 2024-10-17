// src/pages/Dashboard.jsx
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Dashboard = () => {
  return (
    <div>
      <Header />
      <section className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Welcome to Your Dashboard</h1>
        <p>
          This is the dashboard page. Here you will see your bookings,
          notifications, and other personal information.
        </p>
      </section>
      <Footer />
    </div>
  );
};

export default Dashboard;
