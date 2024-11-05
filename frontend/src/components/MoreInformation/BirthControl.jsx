import React from "react";

const BirthControl = () => {
  const options = [
    {
      title: "Depo-Provera",
      description: "Effective birth control with a three-month injection.",
      icon: "💉",
    },
    {
      title: "Nur-isterate",
      description: "Bi-monthly injection for contraception.",
      icon: "💉",
    },
    {
      title: "Implant",
      description: "Three-year long-term contraception implant.",
      icon: "🌟",
    },
    {
      title: "Copper-T IUD",
      description: "Non-hormonal IUD effective for up to five years.",
      icon: "⚕️",
    },
    {
      title: "Hormonal IUD",
      description: "Hormone-based IUD effective for up to five years.",
      icon: "⚕️",
    },
  ];

  return (
    <section className="py-16 px-8 bg-gray-50 animate-fade-in">
      <h2 className="text-h2 font-headers text-darkbrown mb-6 text-center">
        Birth Control Options
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {options.map((option, index) => (
          <div
            key={index}
            className="text-center p-6 bg-white rounded-lg shadow-lg transform transition hover:scale-105"
          >
            <div className="text-5xl mb-4">{option.icon}</div>
            <h3 className="text-3xl font-semibold text-darkbrown font-headers mb-2">
              {option.title}
            </h3>
            <p className="text-gray-600 font-paragraph">{option.description}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <a
          href="/booking"
          className="bg-darkbrown text-luxwhite px-6 py-3 rounded-lg transition hover:bg-opacity-80"
        >
          Schedule an Appointment
        </a>
      </div>
    </section>
  );
};

export default BirthControl;
