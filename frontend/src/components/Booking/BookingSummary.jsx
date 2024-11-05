import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const BookingSummary = ({ treatment, date, time }) => {
  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    if (!treatment || !date || !time) {
      Swal.fire({
        title: "Oops! Booking Incomplete",
        text: "Please ensure you select a treatment, date and time before proceeding to payment.",
        icon: "warning",
        confirmButtonText: "Got it!",
        confirmButtonColor: "#1B2E22", // Change to your preferred button color
        background: "#F7F7F7", // Alert background color
        color: "#333", // Text color
        iconColor: "#FFC107", // Icon color (e.g., yellow for warning)
        customClass: {
          title: "text-3xl font-headers font-semibold text-darkgreen", // Custom CSS for title
          text: "font-paragraph",
          popup: "border border-gray-300 shadow-lg rounded-lg", // Custom CSS for popup box
          confirmButton: "py-2 px-4 font-cta font-semibold rounded-full", // Custom CSS for confirm button
        },
      });
      return;
    }

    // Proceed to payment if all selections are made
    navigate("/payment-options");
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-headers font-semibold text-gray-800 mb-4">
        Booking Summary
      </h2>
      <p className="text-gray-600 mb-2 font-paragraph">
        <strong>Treatment:</strong> {treatment || "Not selected"}
      </p>
      <p className="text-gray-600 mb-2 font-paragraph">
        <strong>Date:</strong>{" "}
        {date ? date.toLocaleDateString() : "Not selected"}
      </p>
      <p className="text-gray-600 mb-2 font-paragraph">
        <strong>Time:</strong> {time || "Not selected"}
      </p>
      <button
        onClick={handleProceedToPayment}
        className="mt-4 bg-lightbrown text-luxwhite font-cta px-4 py-2 rounded-lg hover:bg-opacity-55 transition w-1/2"
      >
        Confirm & Proceed to Payment
      </button>
    </div>
  );
};

export default BookingSummary;
