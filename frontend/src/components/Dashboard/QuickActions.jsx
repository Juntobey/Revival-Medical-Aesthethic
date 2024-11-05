// src/components/Dashboard/QuickActions.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TestimonialUpload from "./TestimonialUpload";
import HistoryModal from "./HistoryModal"; // Import HistoryModal

const QuickActions = () => {
  const [showTestimonialForm, setShowTestimonialForm] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  // Sample history data; replace with fetched data from an API in production
  const historyData = [
    {
      date: "2024-03-20",
      type: "Appointment",
      details: "Checkup with Dr. Smith",
    },
    {
      date: "2024-02-15",
      type: "Payment",
      details: "$100 for Skincare Treatment",
    },
    {
      date: "2024-01-10",
      type: "Appointment",
      details: "Follow-up with Dr. Brown",
    },
  ];

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold font-headers text-darkgreen">
        Quick Actions
      </h2>
      <div className="mt-4 space-y-2">
        {/* Book Appointment Button */}
        <button
          className="w-full bg-lightbrown text-luxwhite p-2 rounded font-cta"
          onClick={() => navigate("/booking")} // Navigate to booking page
        >
          Book Appointment
        </button>

        {/* View History Button */}
        <button
          className="w-full bg-lightbrown text-luxwhite p-2 rounded font-cta"
          onClick={() => setShowHistoryModal(true)} // Open History Modal
        >
          View History
        </button>

        {/* Submit Testimonial Button */}
        <button
          className="w-full bg-lightbrown text-luxwhite p-2 rounded font-cta"
          onClick={() => setShowTestimonialForm(!showTestimonialForm)} // Toggle Testimonial Form
        >
          Submit Testimonial
        </button>
      </div>

      {/* Conditionally render TestimonialUpload component */}
      {showTestimonialForm && (
        <TestimonialUpload onClose={() => setShowTestimonialForm(false)} />
      )}

      {/* Conditionally render HistoryModal component */}
      {showHistoryModal && (
        <HistoryModal
          onClose={() => setShowHistoryModal(false)}
          historyData={historyData} // Pass sample history data
        />
      )}
    </div>
  );
};

export default QuickActions;
