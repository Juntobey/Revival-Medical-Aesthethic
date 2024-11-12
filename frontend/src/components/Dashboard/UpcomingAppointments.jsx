// src/components/Dashboard/UpcomingAppointments.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../config";

const UpcomingAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [appointmentsPerPage] = useState(3);
  const navigate = useNavigate();

  // Fetch appointments from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.id; 
      try {
        const response = await axios.get(`${BASE_URL}/appointments/user/${userId}`);
        const upcomingAppointments = response.data.filter((appointment) => {
          const appointmentDate = new Date(appointment.appointmentDateTime);
          return appointmentDate > new Date();
        });
        setAppointments(upcomingAppointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Calculate pagination indexes
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleReschedule = (appointment) => {
    const appointmentDateTime = new Date(appointment.appointmentDateTime);
    const now = new Date();
    const hoursUntilAppointment = (appointmentDateTime - now) / (1000 * 60 * 60);

    if (hoursUntilAppointment < 24) {
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
        {currentAppointments.length === 0 ? (
          <li className="py-4 text-gray-500">No upcoming appointments.</li>
        ) : (
          currentAppointments.map((appointment, index) => (
            <li
              key={appointment.appointment_id}
              className="py-4 flex items-center justify-between"
            >
              <div>
                <span className="text-gray-700 text-lg">
                  {new Date(appointment.appointmentDateTime).toLocaleString()}
                </span>
                {index === 0 && currentPage === 1 && (
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
          ))
        )}
      </ul>
      <div className="mt-4 flex justify-center space-x-2">
        {Array.from(
          { length: Math.ceil(appointments.length / appointmentsPerPage) },
          (_, i) => i + 1
        ).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-3 py-1 rounded ${
              currentPage === pageNumber
                ? "bg-darkgreen text-white"
                : "bg-gray-200 text-darkgreen"
            }`}
          >
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UpcomingAppointments;
