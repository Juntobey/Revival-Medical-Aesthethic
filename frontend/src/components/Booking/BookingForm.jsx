// src/components/Booking/BookingForm.jsx

import React, { useState, useEffect } from "react";
import BookingHero from "./BookingHero";
import TreatmentSelection from "./TreatmentSelection";
import DateSelection from "./DateSelection";
import TimeSlotSelection from "./TimeSlotSelection";
import BookingSummary from "./BookingSummary";
import OperatingHours from "./OperatingHours"; // New component to show operating hours
import axios from "axios";
import BASE_URL from "../../config";

const BookingForm = () => {
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    // Fetch available dates from backend
    axios
      .get(`${BASE_URL}/doctors/doctor/2/available-dates`)
      .then((response) => setAvailableDates(response.data))
      .catch((error) =>
        console.error("Failed to fetch available dates", error)
      );
  }, []);

  return (
    <>
      <BookingHero />
      <section className="container mx-auto py-10 px-6 max-w-[800px]">
        {/* Clinic Operating Hours Section */}
        <OperatingHours />

        {/* Booking Steps */}
        <div className="flex flex-col gap-6 mt-10">
          {/* Step 1: Date Selection */}
          <DateSelection
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            availableDates={availableDates}
          />

          {/* Step 2: Treatment Selection (appears after date is selected) */}
          {selectedDate && (
            <TreatmentSelection
              selectedTreatment={selectedTreatment}
              setSelectedTreatment={setSelectedTreatment}
            />
          )}

          {/* Step 3: Time Slot Selection (appears after treatment is selected) */}
          {selectedTreatment && (
            <TimeSlotSelection
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              availableDates={availableDates}
            />
          )}

          {/* Summary and Booking Actions */}
          {selectedDate && selectedTreatment && selectedTime && (
            <BookingSummary
              treatment={selectedTreatment}
              date={selectedDate}
              time={
                selectedTime
                  ? `${selectedTime.start_time} - ${selectedTime.end_time}`
                  : "Not selected"
              }
            />
          )}
        </div>
      </section>
    </>
  );
};

export default BookingForm;
