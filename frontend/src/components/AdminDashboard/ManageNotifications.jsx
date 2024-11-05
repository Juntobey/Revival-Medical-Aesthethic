// src/components/AdminDashboard/ManageNotifications.jsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ManageNotifications = () => {
  const [message, setMessage] = useState("");
  const [scheduleDate, setScheduleDate] = useState(null);

  const handleSendNow = () => {
    alert(`Sending notification: ${message}`);
  };

  const handleSchedule = () => {
    if (scheduleDate) {
      alert(
        `Scheduling notification: ${message} for ${scheduleDate.toLocaleString()}`
      );
    } else {
      alert("Please select a date and time.");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-darkgreen mb-4">
        Manage Notifications
      </h2>
      <textarea
        placeholder="Enter notification message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 border rounded-lg mb-4"
      ></textarea>
      <div className="flex space-x-4 mb-4">
        <button
          onClick={handleSendNow}
          className="bg-darkgreen text-white py-2 px-4 rounded-lg"
        >
          Send Now
        </button>
        <DatePicker
          selected={scheduleDate}
          onChange={(date) => setScheduleDate(date)}
          showTimeSelect
          dateFormat="Pp"
          placeholderText="Select Date & Time"
          className="p-2 border rounded-lg"
        />
        <button
          onClick={handleSchedule}
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg"
        >
          Schedule
        </button>
      </div>
    </div>
  );
};

export default ManageNotifications;
