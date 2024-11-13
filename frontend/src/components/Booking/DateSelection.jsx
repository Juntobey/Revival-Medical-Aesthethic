import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const DateSelection = ({ selectedDate, setSelectedDate }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Select a Date
      </h2>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        minDate={new Date()}
        className="rounded-lg p-2 shadow-inner"
        tileClassName="hover:bg-indigo-100 rounded-lg"
      />
    </div>
  );
};

export default DateSelection;
