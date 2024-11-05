// src/pages/Booking.jsx
import React from "react";
import Header from "../components/Includes/Header";
import Footer from "../components/Includes/Footer";
import BookingForm from "../components/Booking/BookingForm";

const Booking = () => {
  return (
    <>
      <Header />
      <main className="pt-[80px]">
        <BookingForm />
      </main>
      <Footer />
    </>
  );
};

export default Booking;
