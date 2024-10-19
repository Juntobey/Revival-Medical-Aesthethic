import React from "react";
import Header from "../components/Includes/Header";
import BookingHero from "../components/Booking/BookingHero";
import BookingForm from "../components/Booking/BookingForm";
import BookingSummary from "../components/Booking/BookingSummary";

const Booking = () => {
  return (
    <>
      <Header />
      <BookingHero />
      <BookingForm />
      <BookingSummary />
    </>
  );
};

export default Booking;
