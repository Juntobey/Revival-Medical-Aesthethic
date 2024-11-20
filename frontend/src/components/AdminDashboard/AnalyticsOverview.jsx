import React, { useState, useEffect, useRef } from "react";
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
import BASE_URL from "../../config";

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
  const [analyticsData, setAnalyticsData] = useState({
    totalBookings: 0,
    totalPayments: 0,
    activeUsers: 0,
    cancelledAppointments: 0,
  });
  const [selectedRange, setSelectedRange] = useState("all"); // Default range: all records
  const [customRange, setCustomRange] = useState({
    startDate: "",
    endDate: "",
  });

  const chartRef = useRef(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        let url = `${BASE_URL}/analytics/overview`;

        // Add query parameters based on the selected range
        if (selectedRange === "day") {
          url += "?range=day";
        } else if (selectedRange === "week") {
          url += "?range=week";
        } else if (selectedRange === "month") {
          url += "?range=month";
        } else if (selectedRange === "custom") {
          url += `?startDate=${customRange.startDate}&endDate=${customRange.endDate}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setAnalyticsData(data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalytics();
  }, [selectedRange, customRange]);

  const handleDateChange = (e) => {
    setCustomRange({ ...customRange, [e.target.name]: e.target.value });
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
        backgroundColor: ["#66bb6a", "#42a5f5", "#AF937B", "#470A12"],
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

  const downloadChart = () => {
    if (chartRef.current) {
      const base64Image = chartRef.current.toBase64Image();
      const link = document.createElement("a");
      link.href = base64Image;
      link.download = "rma-admin-analytics-chart.png";
      link.click();
    }
  };

  const handleViewDetails = () => {
    setIsPopupVisible(true);
  };

  return (
    <div className="p-4 bg-luxwhite rounded-lg shadow-lg">
      <h2 className="text-2xl font-headers font-bold text-darkgreen mb-4">
        Analytics Overview
      </h2>

      {/* Dropdown for predefined ranges */}
      <div className="flex items-center mb-4">
        <label className="mr-2 font-bold">Filter by:</label>
        <select
          value={selectedRange}
          onChange={(e) => setSelectedRange(e.target.value)}
          className="border border-gray-300 rounded-lg py-2 px-4"
        >
          <option value="all">All Records</option>
          <option value="day">Today</option>
          <option value="week">Last Week</option>
          <option value="month">Last Month</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>

      {/* Custom Range Picker */}
      {selectedRange === "custom" && (
        <div className="flex items-center gap-4 mb-4">
          <div>
            <label className="block font-bold mb-1">Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={customRange.startDate}
              onChange={handleDateChange}
              className="border border-gray-300 rounded-lg py-2 px-4"
            />
          </div>
          <div>
            <label className="block font-bold mb-1">End Date:</label>
            <input
              type="date"
              name="endDate"
              value={customRange.endDate}
              onChange={handleDateChange}
              className="border border-gray-300 rounded-lg py-2 px-4"
            />
          </div>
        </div>
      )}

      <Bar ref={chartRef} data={chartData} options={chartOptions} />

      <div className="flex space-x-4 mt-4">
        <button
          onClick={handleViewDetails}
          className="bg-lightbrown font-cta text-luxwhite py-2 px-4 rounded-lg"
        >
          View Details
        </button>
        <button
          onClick={downloadChart}
          className="bg-lightbrown font-cta text-luxwhite py-2 px-4 rounded-lg"
        >
          Download Chart
        </button>
      </div>

      <Popup
        isVisible={isPopupVisible}
        title="Analytics Details"
        message={
          <>
            <p>
              <strong>Total Bookings:</strong> {analyticsData.totalBookings}
            </p>
            <p>
              <strong>Total Payments:</strong> {analyticsData.totalPayments}
            </p>
            <p>
              <strong>Active Users:</strong> {analyticsData.activeUsers}
            </p>
            <p>
              <strong>Cancelled Appointments:</strong>{" "}
              {analyticsData.cancelledAppointments}
            </p>
            <p className="mt-4 font-paragraph text-p text-gray-700">
              This summary provides insights into the recent activities in the
              system. You can track user engagement, payment history, and manage
              appointment cancellations effectively.
            </p>
          </>
        }
        onClose={() => setIsPopupVisible(false)}
      />
    </div>
  );
};

export default AnalyticsOverview;
