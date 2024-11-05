// src/components/DoctorDashboard/ScheduleManagement.jsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Swal from "sweetalert2";

const ScheduleManagement = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availability, setAvailability] = useState({});
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsPopupVisible(true);
  };

  const handleSaveAvailability = (note, isAvailable) => {
    const dateKey = selectedDate.toISOString().split("T")[0]; // Format the date as a key
    setAvailability((prev) => ({
      ...prev,
      [dateKey]: { note, isAvailable },
    }));
    setIsPopupVisible(false);
  };

  const showEditPopup = () => {
    Swal.fire({
      title: "Edit Availability",
      input: "text",
      inputPlaceholder: "Enter a note (e.g., Away, Surgery, Fully booked)",
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      preConfirm: (note) => {
        const isAvailable = !note.toLowerCase().includes("away");
        handleSaveAvailability(note, isAvailable);
      },
    });
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-darkgreen mb-4">
        Manage Schedule
      </h2>
      <p className="text-gray-600 mb-4">
        Select a date to mark availability or add notes for specific dates.
      </p>

      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileContent={({ date }) => {
          const dateKey = date.toISOString().split("T")[0];
          const availabilityInfo = availability[dateKey];
          if (availabilityInfo) {
            return (
              <div
                className={`text-xs ${
                  availabilityInfo.isAvailable
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {availabilityInfo.note}
              </div>
            );
          }
          return null;
        }}
      />

      {isPopupVisible && (
        <div className="mt-4">
          <button
            onClick={showEditPopup}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Edit Availability
          </button>
        </div>
      )}
    </div>
  );
};

export default ScheduleManagement;
