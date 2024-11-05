// src/components/DoctorDashboard/DoctorAnalytics.jsx
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const DoctorAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    totalPatients: 0,
    totalAppointments: 0,
    upcomingAppointments: 0,
    completedAppointments: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/doctor-analytics"
        );
        const data = await response.json();
        setAnalyticsData(data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalytics();
  }, []);

  const chartData = {
    labels: ["Total Patients", "Total Appointments", "Upcoming", "Completed"],
    datasets: [
      {
        label: "Metrics",
        data: [
          analyticsData.totalPatients,
          analyticsData.totalAppointments,
          analyticsData.upcomingAppointments,
          analyticsData.completedAppointments,
        ],
        backgroundColor: ["#42a5f5", "#66bb6a", "#ffa726", "#ef5350"],
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-darkgreen mb-4">Analytics</h2>
      <Bar
        data={chartData}
        options={{ responsive: true, plugins: { legend: { position: "top" } } }}
      />
    </div>
  );
};

export default DoctorAnalytics;
