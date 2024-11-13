import React, { useState, useContext } from "react";
import Header from "../components/Includes/Header";
import Footer from "../components/Includes/Footer";
import { AuthContext } from "../context/AuthContext";
import DateSelection from "../components/Booking/DateSelection";
import TreatmentSelection from "../components/Booking/TreatmentSelection";
import TimeSlotSelection from "../components/Booking/TimeSlotSelection";
import BookingSummary from "../components/Booking/BookingSummary";

const Booking = () => {
  const { auth } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <>
      <Header />
      <main className="pt-[80px] bg-gray-100 min-h-screen flex flex-col items-center">
        <div className="w-full max-w-5xl px-6 py-10">
          <h1 className="text-4xl font-bold text-center text-darkgreen mb-6">
            Book Your Appointment
          </h1>

          {!auth.isAuthenticated && (
            <p className="text-center text-gray-700 mb-8">
              Already a member?{" "}
              <a href="/login" className="text-indigo-600 hover:underline">
                Log in
              </a>
            </p>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <DateSelection
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <TreatmentSelection
              selectedDate={selectedDate}
              selectedTreatment={selectedTreatment}
              setSelectedTreatment={setSelectedTreatment}
            />
            <TimeSlotSelection
              selectedDate={selectedDate}
              selectedTreatment={selectedTreatment}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          </div>

          <BookingSummary
            treatment={selectedTreatment}
            date={selectedDate}
            time={selectedTime}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Booking;
