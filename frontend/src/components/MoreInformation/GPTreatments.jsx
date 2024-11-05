import React from "react";

const GPTreatments = () => {
  const treatments = [
    {
      title: "Joint Pain Management",
      description: "Personalized joint pain treatments.",
      icon: "🦴",
    },
    {
      title: "Vitamin Boosters",
      description: "Vitamin infusions to boost immunity.",
      icon: "💉",
    },
    {
      title: "Wellness Checks",
      description: "Regular health assessments.",
      icon: "🩺",
    },
    {
      title: "Birth Control Options",
      description: "Injections, implants, and IUDs.",
      icon: "⚕️",
    },
    {
      title: "Repair PRP",
      description: "PRP injections for muscular recovery.",
      icon: "💪",
    },
  ];

  return (
    <section className="py-16 px-8 bg-gray-50 animate-fade-in">
      <h2 className="text-h2 font-headers text-darkbrown mb-6 text-center">
        General Practice Treatments
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {treatments.map((treatment, index) => (
          <div
            key={index}
            className="text-center p-6 bg-white rounded-lg shadow-lg transform transition hover:scale-105"
          >
            <div className="text-5xl mb-4">{treatment.icon}</div>
            <h3 className="text-3xl font-headers font-semibold text-darkbrown mb-2">
              {treatment.title}
            </h3>
            <p className="text-gray-600 font-paragraph">
              {treatment.description}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <a
          href="/booking"
          className="bg-darkbrown font-cta text-luxwhite px-6 py-3 rounded-lg transition hover:bg-opacity-80"
        >
          Schedule an Appointment
        </a>
      </div>
    </section>
  );
};

export default GPTreatments;
