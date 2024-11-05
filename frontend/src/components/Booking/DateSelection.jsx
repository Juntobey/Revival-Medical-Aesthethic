import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const DateSelection = ({ selectedDate, setSelectedDate }) => {
  const tileDisabled = ({ date }) => {
    const today = new Date();
    return date < today.setHours(0, 0, 0, 0);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
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
