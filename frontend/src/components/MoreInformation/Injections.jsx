import React from "react";

const Injections = () => {
  const injections = [
    {
      title: "Voltaren",
      description:
        "An anti-inflammatory injection to provide effective pain relief.",
      icon: "💉",
    },
    {
      title: "Celestone",
      description:
        "A steroid injection to help manage inflammation effectively.",
      icon: "💊",
    },
    {
      title: "Dexona",
      description:
        "A versatile injection that serves as both anti-inflammatory and immunosuppressant.",
      icon: "🩺",
    },
    {
      title: "Back Pain Combo",
      description:
        "A combination of injections tailored to relieve back pain and inflammation.",
      icon: "💪",
    },
    {
      title: "Repair PRP",
      description:
        "PRP injections for muscle or joint recovery, supporting the body's natural repair.",
      icon: "🌟",
    },
  ];

  return (
    <section
      className="py-16 px-8 bg-gray-50 animate-fade-in"
      id="injection-treatments"
    >
      <h2 className="text-h2 font-headers text-dark mb-6 text-center">
        Injection Treatments
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {injections.map((injection, index) => (
          <div
            key={index}
            className="text-center p-6 bg-white rounded-lg shadow-lg transform transition hover:scale-105"
          >
            <div className="text-5xl mb-4">{injection.icon}</div>
            <h3 className="text-3xl font-semibold text-darkbrown font-headers mb-2">
              {injection.title}
            </h3>
            <p className="text-gray-600 paragraph">{injection.description}</p>
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

export default Injections;
