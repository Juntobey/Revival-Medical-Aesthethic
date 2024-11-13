import React, { useEffect, useState } from "react";
import axios from "axios";

const TimeSlotSelection = ({
  selectedDate,
  selectedTime,
  setSelectedTime,
  onContinue,
  onBack,
}) => {
  const [availableTimes, setAvailableTimes] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      axios
        .get(
          `https://your-backend-url.com/available-times?date=${selectedDate}`
        )
        .then((response) => setAvailableTimes(response.data))
        .catch((error) => console.error("Failed to fetch times", error));
    }
  }, [selectedDate]);

  return (
    <div className="time-slot-selection">
      <h2>Select a Time Slot</h2>
      <div className="time-options">
        {availableTimes.map((time) => (
          <button
            key={time.id}
            onClick={() => setSelectedTime(time)}
            className={selectedTime?.id === time.id ? "selected" : ""}
          >
            {time.start} - {time.end}
          </button>
        ))}
      </div>
      <button onClick={onBack}>Back</button>
      <button onClick={onContinue} disabled={!selectedTime}>
        Continue
      </button>
    </div>
  );
};

export default TimeSlotSelection;
