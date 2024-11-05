// src/components/AdminDashboard/ManageSchedule.jsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Popup from "../Popup";

const ManageSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [message, setMessage] = useState("");

  const toggleAvailability = () => {
    setMessage(
      `Doctor's availability updated for ${selectedDate.toDateString()}`
    );
    setIsPopupVisible(true);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-darkgreen mb-4">
        Manage Schedule
      </h2>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        className="rounded-lg"
      />
      <button
        onClick={toggleAvailability}
        className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg w-full"
      >
        Update Availability
      </button>
      <Popup
        isVisible={isPopupVisible}
        title="Schedule Update"
        message={message}
        onClose={() => setIsPopupVisible(false)}
      />
    </div>
  );
};

export default ManageSchedule;
