import React from "react";

const TimeSlotSelection = ({ selectedDate, selectedTime, setSelectedTime }) => {
  const availableTimes = selectedDate
    ? ["10:00", "10:15", "10:30", "10:45", "11:00", "11:15"]
    : [];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-headers font-semibold text-gray-800 mb-4">
        Select a Time Slot
      </h2>
      {selectedDate ? (
        <div className="grid grid-cols-2 gap-2">
          {availableTimes.map((time, index) => (
            <button
              key={index}
              onClick={() => setSelectedTime(time)}
              className={`p-2 rounded-lg transition ${
                selectedTime === time
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-800 hover:bg-indigo-100"
              }`}
            >
              {time}
            </button>
          ))}
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
