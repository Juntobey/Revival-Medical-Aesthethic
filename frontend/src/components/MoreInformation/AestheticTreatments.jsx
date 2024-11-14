import React from "react";

const AestheticTreatments = () => {
  const treatments = [
    {
      title: "Hair Loss / Alopecia Treatment",
      description: "Advanced hair restoration treatments to combat hair loss.",
      imageUrl: `${process.env.PUBLIC_URL}/treatment-hairloss.jpeg`,
    },
    {
      title: "Skincare Rejuvenation",
      description: "Customized skincare treatments to bring back your glow.",
      imageUrl: `${process.env.PUBLIC_URL}/treatment-skincare.jpg`,
    },
    {
      title: "PRP (Platelet Rich Plasma)",
      description:
        "Boost skin vitality with PRP therapy using your body’s healing.",
      imageUrl: `${process.env.PUBLIC_URL}/prp.jpg`,
    },
  ];

  return (
    <section
      className="py-16 px-8 bg-almond animate-fade-in"
      id="aesthetic-treatments"
    >
      <h2 className="md:text-h2 text-[30px] font-bold font-headers text-darkgreen mb-6 text-center">
        Aesthetic Treatments
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {treatments.map((treatment, index) => (
          <div
            key={index}
            className="shadow-lg bg-luxwhite overflow-hidden transform transition hover:scale-105"
          >
            <img
              src={treatment.imageUrl}
              alt={treatment.title}
              className="w-full h-[300px] object-cover"
            />
            <div className="p-4">
              <h3 className="md:text-3xl text-[25px] font-headers font-semibold text-darkgreen mb-2">
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

export default AestheticTreatments;
