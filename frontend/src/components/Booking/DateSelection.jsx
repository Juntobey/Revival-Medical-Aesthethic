import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const DateSelection = ({
  selectedDate,
  setSelectedDate,
  availableDates = [],
}) => {
  const tileDisabled = ({ date }) => {
    // Safely check if availableDates is an array
    const isTaken = availableDates?.some(
      (d) => new Date(d.date).toDateString() === date.toDateString()
    );
    return date < new Date() || !isTaken;
  };

  return (
    <div className="p-4 bg-almond rounded-lg shadow-md">
      <h2 className="text-3xl font-headers font-semibold text-gray-800 mb-4">
        Select a Date
      </h2>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileDisabled={tileDisabled}
        className="rounded-lg p-2 shadow-inner"
        tileClassName="hover:bg-indigo-100 rounded-lg"
      />
    </div>
  );
};

export default DateSelection;
