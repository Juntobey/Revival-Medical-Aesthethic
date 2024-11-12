import React from "react";

const PRPTreatments = () => {
  const treatments = [
    {
      title: "Repair PRP",
      description:
        "PRP injections designed to support muscle and joint recovery through the body’s natural healing process.",
      imageUrl: `${process.env.PUBLIC_URL}/repair-prp.jpg`,
    },
    {
      title: "P-Shot (Priapus Shot)",
      description:
        "Enhances blood flow and tissue growth for improved vitality and performance.",
      imageUrl: `${process.env.PUBLIC_URL}/pshot.jpg`,
    },
    {
      title: "Aesthetic PRP",
      description:
        "PRP therapy aimed at revitalizing the skin and reducing signs of aging, using your body’s own healing properties.",
      imageUrl: `${process.env.PUBLIC_URL}/aesthetic-prp.jpg`,
    },
  ];

  return (
    <section
      className="py-16 px-8 animate-fade-in bg-almond"
      id="prp-treatments"
    >
      <h2 className="text-h2 font-headers text-darkgreen mb-6 text-center">
        PRP Treatments
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {treatments.map((treatment, index) => (
          <div
            key={index}
            className="shadow-lg bg-luxwhite rounded-lg overflow-hidden transform transition hover:scale-105"
          >
            <img
              src={treatment.imageUrl}
              alt={treatment.title}
              className="w-full h-[300px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-3xl font-semibold font-headers text-darkgreen mb-2">
                {treatment.title}
              </h3>
              <p className="text-gray-600 mb-4 font-paragraph">
                {treatment.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <a
          href="/booking"
          className="bg-darkgreen font-cta text-luxwhite px-6 py-3 rounded-lg transition hover:bg-opacity-80"
        >
          Schedule an Appointment
        </a>
      </div>
    </section>
  );
};

export default PRPTreatments;