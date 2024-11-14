import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import BASE_URL from "../../config";

const BookingSummary = ({ treatment, date, time }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Get user data from local storage
  const userId = user?.id; // Access userId

  const handleProceedToPayment = () => {
    if (!treatment || !date || !time) {
      Swal.fire({
        title: "Oops! Booking Incomplete",
        text: "Please ensure you select a treatment, date, and time before proceeding to payment.",
        icon: "warning",
        confirmButtonText: "Got it!",
      });
      return;
    }

    const amount = treatment.price;
    const formattedDate = date.toISOString();
    axios
      .post(`${BASE_URL}/invoices/invoice`, {
        treatmentId: treatment.id,
        doctorId: 2, // since we have one doctor right now
        userId,
        formattedDate,
        time,
        amount,
      })
      .then((response) => {
        Swal.fire({
          title: "Booking Successful!",
          // text: "Please choose a payment method.",
          icon: "success",
        });
        navigate("/booking");
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Failed to create invoice. Please try again.",
          icon: "error",
        });
      });
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-md text-center my-[50px] mx-[75px] ">
      <h2 className="text-2xl font-headers font-semibold text-gray-800 mb-4">
        Booking Summary
      </h2>
      <p className="text-gray-600 mb-2 font-paragraph">
        <strong>Treatment:</strong>{" "}
        {treatment?.treatment_name || "Not selected"}
      </p>
      <p className="text-gray-600 mb-2 font-paragraph">
        <strong>Price:</strong> R{treatment?.price || "Not available"}
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
        Confirm & Pay Later
      </button>
    </div>
  );
};

export default BookingSummary;
