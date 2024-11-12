import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../config"; // Ensure your BASE_URL is correctly set up

const HistoryModal = ({ onClose }) => {
  const [historyData, setHistoryData] = useState([]);

  // Fetch appointment history data from the backend
  useEffect(() => {
    const fetchHistory = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id;
      try {
        const response = await axios.get(`${BASE_URL}/appointments/user/${userId}`);

        // Check if the response is an array or a single object
        if (Array.isArray(response.data)) {
          setHistoryData(response.data);
        } else if (response.data && typeof response.data === "object") {
          // If it's a single object, convert it to an array
          setHistoryData([response.data]);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching appointment history:", error);
      }
    };

    fetchHistory();
  }, []);

  // Filter appointments based on conditions
  const filteredHistory = historyData.filter((item) => {
    console.log(item)
    // If appointmentDateTime is available, check if it's in the past
    if (item.appointmentDateTime) {
      const appointmentDate = new Date(item.appointmentDateTime);
      const currentDate = new Date();

      // Only show appointments that are in the past and have a status of "canceled" or "completed"
      return appointmentDate < currentDate && (item.status === "canceled" || item.status === "completed");
    } else {
      // If appointmentDateTime is null, show the appointment if status is not "scheduled"
      return item.status !== "scheduled";
    }
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-3/4 md:w-1/2 lg:w-1/3 shadow-lg relative">
        <h2 className="text-2xl font-semibold mb-4 text-darkgreen">History</h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-2xl"
        >
          &times;
        </button>
        <div className="mt-4 space-y-4">
          {filteredHistory && filteredHistory.length > 0 ? (
            filteredHistory.map((item, index) => (
              <div key={index} className="border-b pb-2">
                <p>
                  <strong>Date:</strong> {item.appointmentDateTime ? new Date(item.appointmentDateTime).toLocaleString() : "N/A"}
                </p>
                <p>
                  <strong>Type:</strong> {item.appointmentTypeId} {/* or any other field you need */}
                </p>
                <p>
                  <strong>Status:</strong> {item.status}
                </p>
                <p>
                  <strong>Details:</strong> {item.notes || "No details available"}
                </p>
              </div>
            ))
          ) : (
            <p>No history available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;
