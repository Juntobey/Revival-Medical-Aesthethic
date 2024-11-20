import React, { useEffect, useState, useRef } from "react";
import { Bar } from "react-chartjs-2";
import Swal from "sweetalert2";
import BASE_URL from "../../config";

const DoctorAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState({
    totalPatients: 0,
    totalAppointments: 0,
    upcomingAppointments: 0,
    completedAppointments: 0,
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
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
          Swal.fire("Error", "User ID is not available.", "error");
          return;
        }

        let url = `${BASE_URL}/analytics/doctor-analytics?doctorId=${user.id}`;

        // Add query parameters based on the selected range
        if (selectedRange === "day") {
          url += "&range=day";
        } else if (selectedRange === "week") {
          url += "&range=week";
        } else if (selectedRange === "month") {
          url += "&range=month";
        } else if (selectedRange === "custom") {
          url += `&startDate=${customRange.startDate}&endDate=${customRange.endDate}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setAnalyticsData(data);
      } catch (error) {
        Swal.fire("Error", "Failed to fetch analytics data", "error");
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalytics();
  }, [selectedRange, customRange]);

  const handleDateChange = (e) => {
    setCustomRange({ ...customRange, [e.target.name]: e.target.value });
  };

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
        backgroundColor: ["#42a5f5", "#66bb6a", "#AF937B", "#470A12"],
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
    const chartInstance = chartRef.current;
    if (chartInstance) {
      const base64Image = chartInstance.toBase64Image();
      const link = document.createElement("a");
      link.href = base64Image;
      link.download = "rma-doctor-analytics-chart.png";
      link.click();
    }
  };

  return (
    <div className="bg-luxwhite p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold font-headers text-darkgreen mb-4">
        Analytics
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

      {/* Chart Display */}
      <Bar ref={chartRef} data={chartData} options={chartOptions} />

      {/* Download Button */}
      <button
        onClick={downloadChart}
        className="mt-4 bg-lightbrown font-cta text-luxwhite py-2 px-4 rounded-lg"
      >
        Download Chart
      </button>
    </div>
  );
};

export default DoctorAnalytics;
