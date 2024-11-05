// src/pages/PaymentOptions.jsx
import React, { useState } from "react";
import { FaCreditCard, FaUniversity, FaMoneyCheckAlt } from "react-icons/fa";

const PaymentOptions = ({ treatment, date, time }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleProceed = () => {
    if (!selectedOption) {
      alert("Please select a payment method.");
      return;
    }
    console.log("Proceeding with:", selectedOption);
  };

  return (
    <section className="container mx-auto py-16 px-6 bg-luxwhite">
      {/* Summary Section */}
      <div className="max-w-xl mx-auto mb-12 bg-light-gray rounded-lg p-6 shadow-md">
        <h2 className="text-3xl font-headers font-bold text-darkgreen mb-4 text-center">
          Booking Summary
        </h2>
        <p className="text-gray-700 font-paragraph">
          <strong>Treatment:</strong> {treatment || "Not selected"}
        </p>
        <p className="text-gray-700 font-paragraph">
          <strong>Date:</strong>{" "}
          {date ? date.toLocaleDateString() : "Not selected"}
        </p>
        <p className="text-gray-700 font-paragraph">
          <strong>Time:</strong> {time || "Not selected"}
        </p>
      </div>

      {/* Payment Options Heading */}
      <h1 className="text-4xl font-headers font-bold text-center text-darkgreen mb-10">
        Choose a Payment Method
      </h1>

      {/* Payment Options */}
      <div className="max-w-xl mx-auto grid grid-cols-1 gap-6">
        {/* Payfast Option */}
        <div
          className={`p-6 rounded-lg shadow-md cursor-pointer transition duration-300 transform ${
            selectedOption === "Payfast"
              ? "ring-2 ring-offset-2 ring-dodger-blue scale-105"
              : "hover:scale-105 hover:ring-2 hover:ring-offset-2 hover:ring-lightblue"
          }`}
          onClick={() => handleOptionClick("Payfast")}
        >
          <div className="flex items-center space-x-4">
            <FaMoneyCheckAlt className="text-3xl text-darkgreen" />
            <div>
              <h2 className="text-xl font-semibold text-darkgreen">Payfast</h2>
              <p className="text-gray-700 font-paragraph">
                Secure and fast payments through Payfast.
              </p>
            </div>
          </div>
        </div>

        {/* Stripe Option */}
        <div
          className={`p-6 rounded-lg shadow-md cursor-pointer transition duration-300 transform ${
            selectedOption === "Stripe"
              ? "ring-2 ring-offset-2 ring-dodger-blue scale-105"
              : "hover:scale-105 hover:ring-2 hover:ring-offset-2 hover:ring-lightblue"
          }`}
          onClick={() => handleOptionClick("Stripe")}
        >
          <div className="flex items-center space-x-4">
            <FaCreditCard className="text-3xl text-darkgreen" />
            <div>
              <h2 className="text-xl font-semibold text-darkgreen">
                Credit Card (Stripe)
              </h2>
              <p className="text-gray-700 font-paragraph">
                Pay using your credit or debit card through Stripe.
              </p>
            </div>
          </div>
        </div>

        {/* Bank Transfer Option */}
        <div
          className={`p-6 rounded-lg shadow-md cursor-pointer transition duration-300 transform ${
            selectedOption === "Bank Transfer"
              ? "ring-2 ring-offset-2 ring-dodger-blue scale-105"
              : "hover:scale-105 hover:ring-2 hover:ring-offset-2 hover:ring-lightblue"
          }`}
          onClick={() => handleOptionClick("Bank Transfer")}
        >
          <div className="flex items-center space-x-4">
            <FaUniversity className="text-3xl text-darkgreen" />
            <div>
              <h2 className="text-xl font-semibold text-darkgreen">
                Bank Transfer
              </h2>
              <p className="text-gray-700 font-paragraph">
                Directly transfer funds to our bank account.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Proceed Button */}
      <div className="mt-10 text-center">
        <button
          onClick={handleProceed}
          className="bg-lightbrown text-luxwhite font-cta px-6 py-3 rounded-lg hover:bg-opacity-80 transition duration-300"
        >
          Confirm & Proceed with {selectedOption || "Payment"}
        </button>
      </div>
    </section>
  );
};

export default PaymentOptions;
