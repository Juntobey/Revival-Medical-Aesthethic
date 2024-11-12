import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Popup from "../Popup";
import BASE_URL from "../../config";

const ManageSchedule = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [loadingSchedules, setLoadingSchedules] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/doctors`);
        if (!response.ok) throw new Error("Failed to fetch doctors");
        const data = await response.json();
        if (data.length === 0) {
          setErrorMessage("No doctors available.");
        }
        setDoctors(data);
      } catch (error) {
        setErrorMessage("Error fetching doctors: " + error.message);
      } finally {
        setLoadingDoctors(false);
      }
    };
    fetchDoctors();
  }, []);

  // Fetch schedules when a doctor is selected
  useEffect(() => {
    if (selectedDoctor) {
      const fetchSchedules = async () => {
        setLoadingSchedules(true);
        try {
          const response = await fetch(`${BASE_URL}/admin/doctor/${selectedDoctor.id}/schedules`);
          if (!response.ok) throw new Error("Failed to fetch schedules");
          const data = await response.json();
          setAvailableSlots(data);
        } catch (error) {
          setErrorMessage("Error fetching schedules: " + error.message);
        } finally {
          setLoadingSchedules(false);
        }
      };
      fetchSchedules();
    }
  }, [selectedDoctor]);

  const toggleAvailability = async () => {
    if (!selectedDoctor) {
      setErrorMessage("Please select a doctor first.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/admin/schedule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          doctorId: selectedDoctor.id,
          date: selectedDate,
        }),
      });
      const data = await response.json();

      if (data.id) {
        setMessage("Doctor's availability updated!");
        setIsPopupVisible(true);
      } else {
        setErrorMessage("Failed to update availability.");
      }
    } catch (error) {
      setErrorMessage("Error updating availability: " + error.message);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-darkgreen mb-4">Manage Schedule</h2>

      {/* Doctor selection */}
      {loadingDoctors ? (
        <p>Loading doctors...</p>
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : doctors.length === 0 ? (
        <p className="text-red-500">No doctors available.</p>
      ) : (
        <div className="mb-4">
          <label htmlFor="doctorSelect" className="block mb-2">Select a Doctor</label>
          <select
            id="doctorSelect"
            value={selectedDoctor?.id || ""}
            onChange={(e) => {
              const doctorId = e.target.value;
              setSelectedDoctor(doctors.find((doctor) => doctor.id === parseInt(doctorId)));
            }}
            className="p-2 border rounded w-full"
          >
            <option value="">Select a Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.username}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Calendar */}
      <div className="mb-4">
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="rounded-lg"
          tileDisabled={({ date }) => date < new Date()}
        />
      </div>

      {/* Update availability button */}
      <button
        onClick={toggleAvailability}
        className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg w-full"
      >
        Update Availability
      </button>

      {/* Loading and Error states for scheduling */}
      {loadingSchedules && <p>Loading schedule...</p>}
      {errorMessage && !loadingDoctors && <p className="text-red-500">{errorMessage}</p>}

      {/* Popup for confirmation */}
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
