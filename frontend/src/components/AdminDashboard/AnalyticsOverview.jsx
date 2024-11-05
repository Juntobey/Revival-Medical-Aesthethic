import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Popup from "../Popup";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsOverview = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const analyticsData = {
    totalBookings: 120,
    totalPayments: 75,
    activeUsers: 40,
    cancelledAppointments: 10,
  };

  const chartData = {
    labels: ["Bookings", "Payments", "Active Users", "Cancellations"],
    datasets: [
      {
        label: "Metrics",
        data: [
          analyticsData.totalBookings,
          analyticsData.totalPayments,
          analyticsData.activeUsers,
          analyticsData.cancelledAppointments,
        ],
        backgroundColor: ["#66bb6a", "#42a5f5", "#ffa726", "#ef5350"],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-darkgreen mb-4">
        Analytics Overview
      </h2>
      <Bar data={chartData} options={chartOptions} />
      <button
        onClick={() => setIsPopupVisible(true)}
        className="mt-4 text-indigo-600 underline"
      >
        View Details
      </button>
      <Popup
        isVisible={isPopupVisible}
        title="Analytics Details"
        message="Detailed analytics insights coming soon."
        onClose={() => setIsPopupVisible(false)}
      />
    </div>
  );
};

export default AnalyticsOverview;
