import React from "react";
import Swal from "sweetalert2";

const BookingSummary = ({ treatment, date, time }) => {
  const handleBooking = (withPayment) => {
    if (!treatment || !date || !time) {
      Swal.fire(
        "Incomplete Booking",
        "Please select a treatment, date, and time.",
        "warning"
      );
      return;
    }

    const bookingMessage = withPayment
      ? "Booking confirmed! Redirecting to payment..."
      : "Booking confirmed! Check your email for details.";

    Swal.fire({
      icon: "success",
      title: bookingMessage,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md text-center mt-6">
      <h2 className="text-2xl font-headers font-semibold text-gray-800 mb-4">
        Booking Summary
      </h2>
      <p className="text-gray-600 mb-2 font-paragraph">
        <strong>Treatment:</strong> {treatment?.name || "Not selected"}
      </p>
      <p className="text-gray-600 mb-2 font-paragraph">
        <strong>Price:</strong>{" "}
        {treatment?.price ? `R${treatment.price}` : "N/A"}
      </p>
      <p className="text-gray-600 mb-2 font-paragraph">
        <strong>Date:</strong>{" "}
        {date ? date.toLocaleDateString() : "Not selected"}
      </p>
      <p className="text-gray-600 mb-2 font-paragraph">
        <strong>Time:</strong>{" "}
        {time ? `${time.start_time} - ${time.end_time}` : "Not selected"}
      </p>
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => handleBooking(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Book and Pay Now
        </button>
        <button
          onClick={() => handleBooking(false)}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Just Book
        </button>
      </div>
    </div>
  );
};

export default BookingSummary;
