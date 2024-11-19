import React, { useState, useEffect } from "react";
import BASE_URL from "../../config";

const WebsiteSettings = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  // Fetch the current maintenance mode status from the API
  useEffect(() => {
    const fetchMaintenanceMode = async () => {
      try {
        const response = await fetch(`${BASE_URL}/maintenance`);
        const data = await response.json();
        setMaintenanceMode(data.is_active);
      } catch (error) {
        console.error("Error fetching maintenance mode:", error);
      }
    };

    fetchMaintenanceMode();
  }, []);

  // Toggle maintenance mode via API
  const toggleMaintenanceMode = async () => {
    try {
      const response = await fetch(`${BASE_URL}/maintenance/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !maintenanceMode }),
      });

      if (response.ok) {
        setMaintenanceMode((prev) => !prev);
        alert(`Maintenance mode ${!maintenanceMode ? "enabled" : "disabled"}!`);
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
      <h2 className="text-h3 font-bold font-headers text-darkgreen mb-4">
        Website Settings
      </h2>
      <div className="flex justify-between items-center">
        <p className="text-gray-700 font-paragraph">
          Maintenance Mode:{" "}
          <span className={maintenanceMode ? "text-red-600" : "text-green-600"}>
            {maintenanceMode ? "ON" : "OFF"}
          </span>
        </p>
        <button
          onClick={toggleMaintenanceMode}
          className="px-4 py-2 bg-darkgreen text-white rounded-lg hover:bg-opacity-80 transition-all duration-300"
        >
          {maintenanceMode ? "Disable" : "Enable"} Maintenance Mode
        </button>
      </div>
    </div>
  );
};

export default WebsiteSettings;
