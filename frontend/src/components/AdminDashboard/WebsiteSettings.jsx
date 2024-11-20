import React, { useState, useEffect } from "react";
import BASE_URL from "../../config";

const WebsiteSettings = () => {
  const [fullMaintenanceMode, setFullMaintenanceMode] = useState(false);
  const [halfMaintenanceMode, setHalfMaintenanceMode] = useState(false);

  // Fetch the current maintenance mode statuses from the API
  useEffect(() => {
    const fetchMaintenanceMode = async () => {
      try {
        const response = await fetch(`${BASE_URL}/maintenance`);
        const data = await response.json();
        setFullMaintenanceMode(data.full_maintenance);
        setHalfMaintenanceMode(data.half_maintenance);
      } catch (error) {
        console.error("Error fetching maintenance mode:", error);
      }
    };

    fetchMaintenanceMode();
  }, []);

  // Toggle maintenance mode (Full or Half) via API
  const toggleMaintenanceMode = async (mode, isActive) => {
    try {
      const response = await fetch(`${BASE_URL}/maintenance/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode, is_active: isActive }),
      });

      if (response.ok) {
        if (mode === "full") {
          setFullMaintenanceMode(isActive);
          alert(`Full Maintenance Mode ${isActive ? "enabled" : "disabled"}!`);
        } else if (mode === "half") {
          setHalfMaintenanceMode(isActive);
          alert(`Half Maintenance Mode ${isActive ? "enabled" : "disabled"}!`);
        }
      } else {
        alert("Failed to toggle maintenance mode. Please try again.");
      }
    } catch (error) {
      console.error("Error toggling maintenance mode:", error);
      alert("An error occurred while toggling maintenance mode.");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold font-headers text-darkgreen mb-4">
        Website Settings
      </h2>

      {/* Full Maintenance Mode Section */}
      <div className="mb-6">
        <h3 className="font-semibold text-darkgreen mb-2">
          Full Maintenance Mode
        </h3>
        <p className="text-gray-700 mb-4">
          This will close the entire site to all users except the admin
          dashboard.
        </p>
        <div className="flex justify-between items-center">
          <p className="text-gray-700 font-paragraph">
            Full Maintenance Mode:{" "}
            <span
              className={
                fullMaintenanceMode ? "text-red-600" : "text-green-600"
              }
            >
              {fullMaintenanceMode ? "ON" : "OFF"}
            </span>
          </p>
          <button
            onClick={() => toggleMaintenanceMode("full", !fullMaintenanceMode)}
            className="px-4 py-2 bg-darkgreen text-white rounded-lg hover:bg-opacity-80 transition-all duration-300"
          >
            {fullMaintenanceMode ? "Disable" : "Enable"} Full Maintenance
          </button>
        </div>
      </div>

      {/* Half Maintenance Mode Section */}
      <div>
        <h3 className="font-semibold text-darkgreen mb-2">
          Half Maintenance Mode
        </h3>
        <p className="text-gray-700 mb-4">
          This will restrict access to patient and doctor dashboards. The admin
          dashboard will remain fully accessible.
        </p>
        <div className="flex justify-between items-center">
          <p className="text-gray-700 font-paragraph">
            Half Maintenance Mode:{" "}
            <span
              className={
                halfMaintenanceMode ? "text-red-600" : "text-green-600"
              }
            >
              {halfMaintenanceMode ? "ON" : "OFF"}
            </span>
          </p>
          <button
            onClick={() => toggleMaintenanceMode("half", !halfMaintenanceMode)}
            className="px-4 py-2 bg-darkgreen text-white rounded-lg hover:bg-opacity-80 transition-all duration-300"
          >
            {halfMaintenanceMode ? "Disable" : "Enable"} Half Maintenance
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebsiteSettings;
