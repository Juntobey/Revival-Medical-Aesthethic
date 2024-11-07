import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import Swal from "sweetalert2";
import BASE_URL from "../../config"; // Assuming BASE_URL is defined

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
        // Retrieve user id from localStorage
        const user = JSON.parse(localStorage.getItem("user")); // Assuming 'user' is the key in localStorage
        if (!user || !user.id) {
          Swal.fire("Error", "User ID is not available.", "error");
          return;
        }

        // Sending the user ID as a query parameter
        const response = await fetch(`${BASE_URL}/analytics/doctor-analytics?doctorId=${user.id}`);
        const data = await response.json();
        setAnalyticsData(data);
      } catch (error) {
        Swal.fire("Error", "Failed to fetch analytics data", "error");
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
