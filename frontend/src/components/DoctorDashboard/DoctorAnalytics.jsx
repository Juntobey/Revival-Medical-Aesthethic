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
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
          Swal.fire("Error", "User ID is not available.", "error");
          return;
        }

        const response = await fetch(
          `${BASE_URL}/analytics/doctor-analytics?doctorId=${user.id}`
        );
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

      background: {
        beforeDraw: (chart) => {
          const ctx = chart.canvas.getContext("2d");
          ctx.save();
          ctx.globalCompositeOperation = "destination-over";
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        },
      },
    },
  };

  // Function to download the chart as an image
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
      <Bar ref={chartRef} data={chartData} options={chartOptions} />

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
