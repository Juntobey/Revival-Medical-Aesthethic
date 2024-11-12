import React, { useState, useEffect } from "react";
import BookingHero from "./BookingHero";
import TreatmentSelection from "./TreatmentSelection";
import DateSelection from "./DateSelection";
import TimeSlotSelection from "./TimeSlotSelection";
import BookingSummary from "./BookingSummary";
import axios from "axios";
import BASE_URL from "../../config";  // Ensure the correct API base URL is imported

const BookingForm = () => {
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);  // Initially set to null
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/doctors/doctor/2/available-dates`)
      .then(response => setAvailableDates(response.data))
      .catch(error => console.error("Failed to fetch available dates", error));
  }, []);

  return (
    <>
      <BookingHero />
      <section className="container mx-auto py-10 px-6 max-w-[1295px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-[20px]">
          <TreatmentSelection
            selectedTreatment={selectedTreatment}
            setSelectedTreatment={setSelectedTreatment}
          />
          <DateSelection
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            availableDates={availableDates} // Pass availableDates to DateSelection
          />
          <TimeSlotSelection
            selectedDate={selectedDate}
            selectedTime={selectedTime}  // Pass selectedTime (which should be an object)
            setSelectedTime={setSelectedTime}
            availableDates={availableDates} // Pass availableDates to TimeSlotSelection
          />
        </div>

        <BookingSummary
          treatment={selectedTreatment}
          date={selectedDate}
          time={selectedTime ? `${selectedTime.start_time} - ${selectedTime.end_time}` : "Not selected"}  // Render start_time and end_time
        />
      </section>
    </>
  );
};

export default BookingForm;
