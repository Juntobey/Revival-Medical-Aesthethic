// src/pages/PaymentOptions.jsx
import React from "react";

const PaymentOptions = () => {
  return (
    <section className="container mx-auto py-16">
      <h1 className="text-h1 font-cormorant text-darkgreen text-center mb-8">
        Choose a Payment Method
      </h1>
      <div className="max-w-lg mx-auto">
        <div className="flex flex-col space-y-6">
          {/* Payfast Option */}
          <button className="w-full bg-lightblue text-darkgreen py-4 px-6 rounded-lg hover:bg-opacity-80 transition duration-300">
            Payfast
          </button>

          {/* Stripe Option */}
          <button className="w-full bg-lightblue text-darkgreen py-4 px-6 rounded-lg hover:bg-opacity-80 transition duration-300">
            Credit Card (Stripe)
          </button>

          {/* Bank Transfer Option */}
          <button className="w-full bg-lightblue text-darkgreen py-4 px-6 rounded-lg hover:bg-opacity-80 transition duration-300">
            Bank Transfer
          </button>
        </div>
      </div>
    </section>
  );
};

export default PaymentOptions;
