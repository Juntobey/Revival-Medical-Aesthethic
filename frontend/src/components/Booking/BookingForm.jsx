// src/components/Booking/BookingForm.jsx
import React, { useState } from "react";
import BookingHero from "./BookingHero";
import TreatmentSelection from "./TreatmentSelection";
import DateSelection from "./DateSelection";
import TimeSlotSelection from "./TimeSlotSelection";
import BookingSummary from "./BookingSummary";

const BookingForm = () => {
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");

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
          />
          <TimeSlotSelection
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
          />
        </div>

        <BookingSummary
          treatment={selectedTreatment}
          date={selectedDate}
          time={selectedTime}
        />
      </section>
    </>
  );
};

export default BookingForm;
