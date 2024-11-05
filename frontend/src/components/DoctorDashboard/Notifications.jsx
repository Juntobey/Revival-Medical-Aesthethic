// src/components/DoctorDashboard/Notifications.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Notifications = () => {
  const [message, setMessage] = useState("");
  const [sendDate, setSendDate] = useState(null);

  const handleSendNow = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/send-notification",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, schedule: null }),
        }
      );
      if (response.ok) {
        Swal.fire(
          "Notification Sent",
          "Your message has been sent to the patient.",
          "success"
        );
        setMessage("");
      } else {
        Swal.fire("Error", "Failed to send notification.", "error");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  const handleScheduleSend = async () => {
    if (!sendDate) {
      Swal.fire("Error", "Please select a date and time.", "error");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:3000/api/send-notification",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, schedule: sendDate }),
        }
      );
      if (response.ok) {
        Swal.fire(
          "Notification Scheduled",
          `Message scheduled for ${sendDate}`,
          "success"
        );
        setMessage("");
        setSendDate(null);
      } else {
        Swal.fire("Error", "Failed to schedule notification.", "error");
      }
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-darkgreen mb-4">Notifications</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your message..."
        className="w-full p-2 mb-2 border rounded-lg"
        rows="4"
      ></textarea>
      <button
        onClick={handleSendNow}
        className="bg-green-500 text-white py-2 px-4 rounded-lg mr-2"
      >
        Send Now
      </button>
      <DatePicker
        selected={sendDate}
        onChange={(date) => setSendDate(date)}
        showTimeSelect
        dateFormat="Pp"
        className="p-2 border rounded-lg mr-2"
        placeholderText="Select Date & Time"
      />
      <button
        onClick={handleScheduleSend}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg"
      >
        Schedule
      </button>
    </div>
  );
};

export default Notifications;
