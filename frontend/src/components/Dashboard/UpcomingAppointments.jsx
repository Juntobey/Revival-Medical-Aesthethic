// src/components/Dashboard/UpcomingAppointments.jsx
import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const UpcomingAppointments = () => {
  const navigate = useNavigate();

  const appointments = [
    { id: 1, date: "December 20, 2024", time: "10:00 AM" },
    { id: 2, date: "January 5, 2025", time: "2:00 PM" },
  ];

  const handleReschedule = (appointment) => {
    const appointmentDateTime = new Date(
      `${appointment.date} ${appointment.time}`
    );
    const now = new Date();
    const hoursUntilAppointment =
      (appointmentDateTime - now) / (1000 * 60 * 60);

    if (hoursUntilAppointment < 24) {
      // If the appointment is within 24 hours, show an alert
      Swal.fire({
        title: "Rescheduling Not Allowed",
        text: "You cannot reschedule an appointment within 24 hours of the scheduled time.",
        icon: "warning",
        confirmButtonText: "Okay",
        customClass: {
          popup: "bg-white text-gray-800",
          confirmButton: "bg-darkgreen text-white px-4 py-2 rounded",
        },
      });
      return;
    }

    // If the appointment can be rescheduled, open the reschedule modal
    Swal.fire({
      title: "Reschedule Appointment",
      text: "Would you like to choose a new date and time for this appointment?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, reschedule",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "bg-white text-gray-800",
        confirmButton: "bg-darkgreen text-white px-4 py-2 rounded",
        cancelButton: "bg-gray-300 text-darkgreen px-4 py-2 rounded",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirect to booking page or open an inline reschedule modal
        navigate("/booking", { state: { appointmentId: appointment.id } });
      }
    });
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg">
      <h2 className="text-2xl font-headers font-semibold text-darkgreen mb-4">
        Upcoming Appointments
      </h2>
      <ul className="divide-y divide-gray-300">
        {appointments.map((appointment, index) => (
          <li
            key={appointment.id}
            className="py-4 flex items-center justify-between"
          >
            <div>
              <span className="text-gray-700 text-lg">
                {appointment.date} - {appointment.time}
              </span>
              {index === 0 && (
                <span className="ml-2 text-xs font-semibold text-lightbrown">
                  Next Appointment
                </span>
              )}
            </div>
            <button
              onClick={() => handleReschedule(appointment)}
              className="text-blue-500 text-sm"
            >
              Reschedule
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UpcomingAppointments;
