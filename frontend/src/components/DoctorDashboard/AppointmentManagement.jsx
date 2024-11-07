import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../config";

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");


  useEffect(() => {
    const fetchAppointments = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) {
        console.error("User ID not found in local storage");
        return;
      }

      try {
        const response = await axios.get(`${BASE_URL}/appointments/doctor-appointments`, {
          params: { id: user.id },
        });
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleComplete = async (id) => {
    try {
      await axios.patch(`${BASE_URL}/appointments/${id}/complete`);
      setAppointments((prev) =>
        prev.map((appt) =>
          appt.appointment_id === id ? { ...appt, status: "completed" } : appt
        )
      );
      setModalMessage("Appointment status updated successfully!");
      setShowModal(true);
      window.location.reload()
    } catch (error) {
      console.error("Error completing appointment:", error);
    }
  };

  const handleReschedule = (id) => {
    // Logic for rescheduling, e.g., opening a modal to pick a new date/time
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-darkgreen mb-4">Appointments</h2>
      {loading ? (
        <p>Loading appointments...</p>
      ) : (
        <div className="max-h-[400px] overflow-y-auto">
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment.appointment_id} className="border-b py-2">
                <p>
                  <strong>Patient:</strong> {appointment.patientEmail}
                </p>
                <p>
                  <strong>Date:</strong> {new Date(appointment.appointmentDateTime).toLocaleString()}
                </p>
                <p>
                  <strong>Status:</strong> {appointment.status}
                </p>
                <button
                  onClick={() => handleComplete(appointment.appointment_id)}
                  className="text-green-500 underline mr-2"
                >
                  Mark Complete
                </button>
                <button
                  onClick={() => handleReschedule(appointment.appointment_id)}
                  className="text-blue-500 underline"
                >
                  Reschedule
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
            <h3 className="text-lg font-bold text-green-500">{modalMessage}</h3>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentManagement;
