import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Popup from "../Popup";
import BASE_URL from "../../config";

const ManageSchedule = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [daySlots, setDaySlots] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [loadingSchedules, setLoadingSchedules] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [newTimeSlot, setNewTimeSlot] = useState({ start_time: "", end_time: "" });

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${BASE_URL}/admin/doctors`);
        if (!response.ok) throw new Error("Failed to fetch doctors");
        const data = await response.json();
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
  const fetchSchedules = async () => {
    if (selectedDoctor) {
      setLoadingSchedules(true);
      try {
        const response = await fetch(
          `${BASE_URL}/admin/doctor/${selectedDoctor.id}/schedules`
        );
        if (!response.ok) throw new Error("Failed to fetch schedules");
        const data = await response.json();
        setAvailableSlots(data);
      } catch (error) {
        setErrorMessage("Error fetching schedules: " + error.message);
      } finally {
        setLoadingSchedules(false);
      }
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [selectedDoctor]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  
    // Filter schedules to get slots for the selected date
    const selectedSchedule = availableSlots.find(
      (schedule) => new Date(schedule.date).toLocaleDateString() === date.toLocaleDateString()
    );
  
    // If a schedule exists, get the `TimeSlots` array; otherwise, set an empty array
    const daySlots = selectedSchedule ? selectedSchedule.TimeSlots : [];
  
    // Update state based on availability of slots
    setDaySlots(daySlots);
    if (daySlots.length > 0) {
      setMessage(`Available slots for ${date.toLocaleDateString()}`);
    } else {
      setMessage(`Doctor not booked for ${date.toLocaleDateString()}`);
    }
    setIsPopupVisible(true);
  };
  

  const handleTimeSlotChange = (e) => {
    const { name, value } = e.target;
    setNewTimeSlot((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [note, setNote] = useState("");

const handleAddTimeSlot = async () => {
  const scheduleData = {
    doctor_id: selectedDoctor.id,
    date: selectedDate.toISOString().split("T")[0],
    is_available: true,
    note: note || undefined, // add note only if provided
    TimeSlots: [
      { start_time: newTimeSlot.start_time, end_time: newTimeSlot.end_time },
    ],
  };
  try {
    const response = await fetch(`${BASE_URL}/admin/schedule/${selectedDoctor.id}/time-slot`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(scheduleData),
    });
    if (!response.ok) throw new Error("Failed to add time slot");

    setMessage("Time slot successfully added!");
    setIsPopupVisible(false);
    setNewTimeSlot({ start_time: "", end_time: "" });
    setNote("");
    await fetchSchedules(); // Refresh schedules
  } catch (error) {
    setErrorMessage("Error adding time slot: " + error.message);
  }
};

const handleDeleteTimeSlot = async (slotId) => {
  try {
    const response = await fetch(`${BASE_URL}/admin/time-slot/${slotId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete time slot");

    await fetchSchedules(); // Refresh after deletion
  } catch (error) {
    setErrorMessage("Error deleting time slot: " + error.message);
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
          tileClassName={({ date }) => {
            const dateString = date.toLocaleDateString();
            const isAvailable = availableSlots.some(
              (slot) => new Date(slot.date).toLocaleDateString() === dateString
            );
            return isAvailable ? 'available-slot' : '';
          }}
          tileContent={({ date }) => {
            const dateString = date.toLocaleDateString();
            const schedule = availableSlots.find(
              (slot) => new Date(slot.date).toLocaleDateString() === dateString
            );
            return schedule && schedule.note ? (
              <span className="note">{schedule.note}</span>
            ) : null;
          }}
          onClickDay={handleDateClick}
        />
      </div>

      {/* Popup for time slots */}
      <Popup
        isVisible={isPopupVisible}
        title="Manage Slots for Selected Date"
        message={message}
        onClose={() => setIsPopupVisible(false)}
      >
        
      </Popup>
      
      {daySlots.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold">Booked Time Slots</h3>
          <ul className="list-disc pl-5">
            {daySlots.map((slot) => (
              <li key={slot.id}>
                {`${slot.start_time} - ${slot.end_time}`}
                <button
                  onClick={() => handleDeleteTimeSlot(slot.id)}
                  className="ml-2 text-red-500"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {message === `Doctor not booked for ${selectedDate.toLocaleDateString()}` && (
        <div>
          <h3 className="text-lg font-semibold">Add a Time Slot</h3>
          <div className="mb-4">
            <label htmlFor="start_time" className="block">Start Time</label>
            <input
              type="time"
              id="start_time"
              name="start_time"
              value={newTimeSlot.start_time}
              onChange={handleTimeSlotChange}
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="end_time" className="block">End Time</label>
            <input
              type="time"
              id="end_time"
              name="end_time"
              value={newTimeSlot.end_time}
              onChange={handleTimeSlotChange}
              className="p-2 border rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="note" className="block">Note</label>
            <input
              type="text"
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="p-2 border rounded w-full"
            />
          </div>
          <button
            onClick={handleAddTimeSlot}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Add Time Slot
          </button>
        </div>
      )}

    </div>
  );
};

export default ManageSchedule;
