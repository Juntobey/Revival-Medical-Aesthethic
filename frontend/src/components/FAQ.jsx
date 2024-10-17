// src/components/FAQ.jsx
import React from "react";

const FAQ = () => {
  return (
    <section className="py-16 px-8 bg-gray-100">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-4xl font-bold mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div>
            <h4 className="text-xl font-semibold">
              What services do you offer?
            </h4>
            <p className="text-gray-700">
              We offer a range of aesthetic treatments including facials, body
              contouring, and more.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-semibold">
              How do I book an appointment?
            </h4>
            <p className="text-gray-700">
              You can book an appointment online through our booking page or
              call our clinic directly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
