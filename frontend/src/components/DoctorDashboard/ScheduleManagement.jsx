import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import BASE_URL from "../../config";

const ScheduleManagement = () => {
  const MySwal = withReactContent(Swal);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availability, setAvailability] = useState({});
  const [appointments, setAppointments] = useState([]);
  const doctorId = 3;

  useEffect(() => {
    fetchAvailability();
  }, [doctorId]);

  const fetchAvailability = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/doctors/${doctorId}/schedule`);
      const schedules = response.data.schedules;

      const availabilityMap = {};
      schedules.forEach((schedule) => {
        availabilityMap[schedule.date] = {
          ...schedule, 
          timeSlots: schedule.TimeSlots,
        };
      });
      setAvailability(availabilityMap);
    } catch (error) {
      console.error("Error fetching availability:", error);
    }
  };

  const fetchAppointments = async (dateKey) => {
    try {
      const response = await axios.get(`${BASE_URL}/doctors/${doctorId}/appointments`, {
        params: { date: dateKey },
      });
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handleDateChange = async (date) => {
    const dateKey = date.toISOString().split("T")[0];
    setSelectedDate(date);
    await fetchAppointments(dateKey);
    showEditPopup(dateKey);
  };

  const showEditPopup = async (dateKey) => {
    const scheduleForDate = availability[dateKey];
    const timeSlots = scheduleForDate ? scheduleForDate.timeSlots : [];
    const scheduleNote = scheduleForDate ? scheduleForDate.note : "No note provided for this schedule.";

    MySwal.fire({
      title: scheduleForDate ? "Edit Schedule" : "Add Availability",
      html: `
        <div style="font-family: Arial, sans-serif; max-height: 80vh; overflow-y: auto;">
          <h3 style="color: #2d3748; margin-bottom: 15px;">Appointments</h3>
          ${appointments.length > 0 ? 
            appointments
              .map(
                (appointment) => `
                  <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                    <span>${new Date(appointment.appointmentDateTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}</span>
                    <button data-id="${appointment.id}" class="cancel-appointment" style="color: white; background-color: red; border: none; padding: 5px 10px; cursor: pointer;">
                      Cancel
                    </button>
                  </div>`
              )
              .join("") 
            : "<p>No appointments for today.</p>"
          }
          <h3 style="color: #2d3748; margin-bottom: 15px;">Available Time Slots</h3>
          ${timeSlots
            .map(
              (slot) => `
                <div style="display: flex; justify-content: space-between; margin-bottom: 10px; align-items: center;">
                  <span style="flex-grow: 1;">${slot.start_time} - ${slot.end_time}</span>
                  <span style="color: #4a5568; font-style: italic;">${scheduleForDate.note}</span>
                  <button data-id="${slot.id}" class="toggle-availability" style="color: white; background-color: ${slot.is_available ? 'green' : 'gray'}; border: none; padding: 5px 10px; cursor: pointer;">
                    ${slot.is_available ? "Make Unavailable" : "Make Available"}
                  </button>
                </div>`
            )
            .join("")}
          <h3 style="color: #2d3748; margin-top: 20px;">Add New Time Slot</h3>
          <div style="display: flex; flex-direction: column; gap: 15px;">
            <div>
              <label for="startTime" style="font-size: 14px; color: #4a5568;">Start Time</label>
              <input type="time" id="startTime" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 100%;" />
            </div>
            <div>
              <label for="endTime" style="font-size: 14px; color: #4a5568;">End Time</label>
              <input type="time" id="endTime" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 100%;" />
            </div>
            <div>
              <label for="note" style="font-size: 14px; color: #4a5568;">Note (Optional)</label>
              <input type="text" id="note" placeholder="Enter a note (e.g., Available, Away)" style="padding: 8px; border: 1px solid #ccc; border-radius: 4px; width: 100%;" />
            </div>
          </div>
        </div>`,
      showCancelButton: true,
      confirmButtonText: "Save",
      didOpen: () => {
        document.querySelectorAll(".cancel-appointment").forEach((button) =>
          button.addEventListener("click", () => handleCancelAppointment(button.getAttribute("data-id"))),
        );
        document.querySelectorAll(".toggle-availability").forEach((button) =>
          button.addEventListener("click", () => toggleAvailability(button.getAttribute("data-id"))),
        );
      },
      preConfirm: () => {
        const startTime = document.getElementById("startTime").value;
        const endTime = document.getElementById("endTime").value;
        const note = document.getElementById("note").value;
        return { startTime, endTime, note };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        addNewTimeSlot(result.value.startTime, result.value.endTime, result.value.note, dateKey);
      }
    });
  };

  const addNewTimeSlot = async (startTime, endTime, note, dateKey) => {
    if (!startTime || !endTime) {
      Swal.fire("Please select both start and end times for the new time slot.");
      return;
    }

    try {
      const scheduleForDate = availability[dateKey];

      if (scheduleForDate) {
        await axios.post(`${BASE_URL}/doctors/${doctorId}/schedule/${scheduleForDate.id}/timeslots`, {
          date: dateKey,
          start_time: startTime,
          end_time: endTime,
          is_available: true,
          note,
        });
      } else {
        await axios.post(`${BASE_URL}/doctors/${doctorId}/schedule/new`, {
          date: dateKey,
          start_time: startTime,
          end_time: endTime,
          is_available: true,
          note,
        });
      }

      fetchAvailability(); // Refresh the availability after adding the time slot
    } catch (error) {
      console.error("Error adding new time slot:", error);
    }
  };

  const toggleAvailability = async (slotId) => {
    try {
      const response = await axios.patch(`${BASE_URL}/doctors/timeslots/${slotId}/toggle`);
      console.log(response.data.message);
      fetchAvailability(); // Refresh the availability after toggling
    } catch (error) {
      console.error("Error toggling availability:", error);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      await axios.patch(`${BASE_URL}/appointments/${appointmentId}`, { status: "canceled" });
      setAppointments((prev) => prev.filter((appt) => appt.id !== appointmentId));
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
  };

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-darkgreen mb-4">Manage Schedule</h2>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        tileContent={({ date }) => {
          const dateKey = date.toISOString().split("T")[0];
          const availabilityInfo = availability[dateKey];
          if (availabilityInfo && availabilityInfo.timeSlots && availabilityInfo.timeSlots.length > 0) {
            return <div>{availabilityInfo.timeSlots.length} Slot(s) Available</div>;
          }
          return null;
        }}
      />
    </div>
  );
};

export default ScheduleManagement;
