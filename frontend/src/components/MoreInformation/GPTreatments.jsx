import React from "react";

const GPTreatments = () => {
  const treatments = [
    {
      title: "Joint Pain Management",
      description:
        "Our joint pain management services aim to alleviate pain and help you regain mobility.",
      icon: "🦴",
    },
    {
      title: "Vitamin Boosters",
      description:
        "Replenish essential nutrients with our specialized vitamin booster therapies.",
      icon: "💉",
    },
    {
      title: "General Wellness Checks",
      description:
        "Stay on top of your health with our comprehensive wellness checks and screenings.",
      icon: "🩺",
    },
  ];

  return (
    <section className="py-16 px-8 bg-gray-50">
      <h2 className="text-h2 font-cormorant text-darkgreen mb-6 text-center">
        General Practice Treatments
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {treatments.map((treatment, index) => (
          <div
            key={index}
            className="text-center p-6 bg-white rounded-lg shadow-lg"
          >
            <div className="text-4xl mb-4">{treatment.icon}</div>
            <h3 className="text-h3 font-cormorant text-darkgreen mb-2">
              {treatment.title}
            </h3>
            <p className="text-p text-gray-600 mb-6">{treatment.description}</p>
            {/* Schedule an Appointment Button */}
            <a
              href="/schedule"
              className="inline-block bg-darkgreen text-luxwhite px-6 py-3 rounded-lg text-lg hover:bg-opacity-80 transition duration-300"
            >
              Schedule an Appointment
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GPTreatments;
