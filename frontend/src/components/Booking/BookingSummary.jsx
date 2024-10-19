import React from "react";
import { useNavigate } from "react-router-dom";

const BookingSummary = ({ treatment, date, time }) => {
  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    navigate("/payment-options"); // Redirect to payment options page
  };

  return (
    <section className="bg-gray-100 py-8 px-6 rounded-lg max-w-[600px] mx-auto">
      <h3 className="text-h3 font-cormorant text-darkgreen mb-6">
        Booking Summary
      </h3>
      <p className="text-p font-lato text-gray-700 mb-4">
        <strong>Treatment:</strong> {treatment}
      </p>
      <p className="text-p font-lato text-gray-700 mb-4">
        <strong>Date:</strong> {date}
      </p>
      <p className="text-p font-lato text-gray-700 mb-4">
        <strong>Time:</strong> {time}
      </p>
      <button
        onClick={handleProceedToPayment}
        className="mt-6 bg-darkgreen text-luxwhite px-6 py-3 rounded-lg hover:bg-opacity-80 inline-block"
      >
        Confirm & Proceed to Payment
      </button>
    </section>
  );
};

export default BookingSummary;
