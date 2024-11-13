import React from "react";

const TimeSlotSelection = ({ selectedDate, selectedTime, setSelectedTime, availableDates = [] }) => {
  // Find the time slots for the selected date
  const selectedDaySlots = availableDates.find(
    (dateObj) => new Date(dateObj.date).toDateString() === new Date(selectedDate).toDateString()
  );

  // If slots are available for that date, extract them
  const availableTimes = selectedDaySlots ? selectedDaySlots.timeslots : [];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-headers font-semibold text-gray-800 mb-4">
        Select a Time Slot
      </h2>
      {selectedDate ? (
        <div className="grid grid-cols-2 gap-2">
          {availableTimes.length > 0 ? (
            availableTimes.map((slot) => (
              <button
                key={slot.id}
                onClick={() => setSelectedTime(slot)}  // Pass the entire slot object to setSelectedTime
                className={`p-2 rounded-lg transition ${
                  selectedTime && selectedTime.id === slot.id
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-indigo-100"
                }`}
              >
                {/* Render the start_time and end_time only */}
                {slot.start_time} - {slot.end_time}
              </button>
            ))
          ) : (
            <p className="text-gray-600 font-paragraph">No available time slots for this date.</p>
          )}
        </div>
      ) : (
        <p className="text-gray-600 font-paragraph">
          Please select a date to view available time slots.
        </p>
      )}
    </div>
  );
};

export default TimeSlotSelection;
