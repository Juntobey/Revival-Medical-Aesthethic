// src/components/DoctorDashboard/AppointmentManagement.jsx
import React, { useState, useEffect } from "react";

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, patientName: "Jane Doe", date: "2024-11-05", status: "Upcoming" },
    {
      id: 2,
      patientName: "John Smith",
      date: "2024-11-06",
      status: "Upcoming",
    },
  ]);

  const handleComplete = (id) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: "Completed" } : appt
      )
    );
  };

  const handleReschedule = (id) => {
    // Logic for rescheduling
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-darkgreen mb-4">Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment.id} className="border-b py-2">
            <p>
              <strong>Patient:</strong> {appointment.patientName}
            </p>
            <p>
              <strong>Date:</strong> {appointment.date}
            </p>
            <p>
              <strong>Status:</strong> {appointment.status}
            </p>
            <button
              onClick={() => handleComplete(appointment.id)}
              className="text-green-500 underline mr-2"
            >
              Mark Complete
            </button>
            <button
              onClick={() => handleReschedule(appointment.id)}
              className="text-blue-500 underline"
            >
              Reschedule
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentManagement;
