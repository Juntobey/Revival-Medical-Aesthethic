// src/components/Dashboard/Schedule.jsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import Swal from "sweetalert2";
import "react-calendar/dist/Calendar.css"; // Import the default styling for the calendar

const Schedule = () => {
  // State to hold dates with appointments
  const [appointments, setAppointments] = useState([
    "2024-03-20",
    "2024-04-05",
  ]);
  const today = new Date();

  // Function to handle date clicks on the calendar
  const handleDateClick = (date) => {
    const selectedDate = date.toISOString().split("T")[0]; // Format date to "YYYY-MM-DD"

    // Check if the selected date is in the appointments array
    if (appointments.includes(selectedDate)) {
      Swal.fire(
        "Info",
        "You already have an appointment on this date.",
        "info"
      );
    } else {
      Swal.fire({
        title: "Book an Appointment",
        text: `Would you like to book an appointment on ${selectedDate}?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, book now",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          // Navigate to booking page (use your routing logic here)
          window.location.href = "/booking";
        }
      });
    }
  };

  // Tile content function to highlight dates with appointments
  const tileContent = ({ date, view }) => {
    const formattedDate = date.toISOString().split("T")[0];
    return (
      view === "month" &&
      appointments.includes(formattedDate) && (
        <div className="bg-green-200 rounded-full w-full h-full flex items-center justify-center text-sm font-semibold text-green-700">
          •
        </div>
      )
    );
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg">
      <h2 className="text-2xl font-headers font-semibold text-darkgreen">
        Schedule
      </h2>
      <p className="mt-2 text-gray-600">
        Click on a date to view or book appointments.
      </p>

      <div className="mt-4">
        <Calendar
          onClickDay={handleDateClick}
          tileContent={tileContent}
          minDate={today} // Disable previous dates
          className="border border-gray-300 rounded-lg"
        />
      </div>
    </div>
  );
};

export default Schedule;
