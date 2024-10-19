import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import CSS for the calendar

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");

  const treatments = [
    { name: "Virtual Consultation", duration: "15 mins" },
    { name: "In-Person Skincare Treatment", duration: "1hr 30mins" },
    { name: "PRP Therapy", duration: "30 mins" },
  ];

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Based on selected date, update available times and durations (mock example)
    if (date.toISOString().slice(0, 10) === "2024-11-01") {
      setAvailableTimes(["10:00 AM", "11:30 AM", "2:00 PM"]);
    } else {
      setAvailableTimes(["9:00 AM", "1:00 PM"]);
    }
  };

  return (
    <section className="py-10 px-6 max-w-[1295px] mx-auto">
      <h2 className="text-h2 font-cormorant text-darkgreen mb-6">
        Choose Your Treatment
      </h2>

      {/* Treatment Selection */}
      <div className="mb-8">
        <label className="text-darkgreen text-p block mb-2">
          Select Treatment:
        </label>
        <select className="border-gray-300 p-3 rounded-lg w-full">
          {treatments.map((treatment, index) => (
            <option key={index} value={treatment.name}>
              {treatment.name} - {treatment.duration}
            </option>
          ))}
        </select>
      </div>

      {/* Calendar */}
      <div className="mb-8">
        <label className="text-darkgreen text-p block mb-2">Select Date:</label>
        <Calendar
          onChange={handleDateChange}
          tileClassName={({ date }) =>
            date.getDay() === 0 ? "text-opacity-50" : "text-opacity-100"
          } // example for weekend disable
          className="w-full rounded-lg"
        />
      </div>

      {/* Available Time Slots */}
      {selectedDate && (
        <div className="mb-8">
          <label className="text-darkgreen text-p block mb-2">
            Available Time Slots:
          </label>
          <div className="grid grid-cols-2 gap-4">
            {availableTimes.map((time, index) => (
              <button
                key={index}
                className={`p-3 border rounded-lg ${
                  selectedTime === time
                    ? "bg-darkgreen text-white"
                    : "border-gray-300 text-darkgreen"
                }`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default BookingForm;
