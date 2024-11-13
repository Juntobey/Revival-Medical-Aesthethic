import React, { useState, useContext, useEffect } from "react";
import Header from "../components/Includes/Header";
import Footer from "../components/Includes/Footer";
import { AuthContext } from "../context/AuthContext";
import DateSelection from "../components/Booking/DateSelection";
import TreatmentSelection from "../components/Booking/TreatmentSelection";
import TimeSlotSelection from "../components/Booking/TimeSlotSelection";
import BookingSummary from "../components/Booking/BookingSummary";
import BASE_URL from "../config";
import axios from "axios";

const Booking = () => {
  const { auth } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTreatment, setSelectedTreatment] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [loading, setLoading] = useState(true);  // Track loading state


  useEffect(() => {
    console.log("Fetching available dates...");
    axios.get(`${BASE_URL}/doctors/doctor/2/available-dates`)
      .then(response => {
        setAvailableDates(response.data);
        setLoading(false);  // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error("Failed to fetch available dates", error);
        setLoading(false);  // Set loading to false in case of an error
      });
  }, []);

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
              availableDates={availableDates}
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
              availableDates={availableDates}
            />
          </div>

          <BookingSummary
          treatment={selectedTreatment}
          date={selectedDate}
          time={selectedTime ? `${selectedTime.start_time} - ${selectedTime.end_time}` : "Not selected"}  // Render start_time and end_time
        />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Booking;
