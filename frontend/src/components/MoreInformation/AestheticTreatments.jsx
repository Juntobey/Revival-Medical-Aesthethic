import React from "react";

const AestheticTreatments = () => {
  const treatments = [
    {
      title: "Hair Loss / Alopecia Treatment",
      description:
        "We offer advanced hair restoration treatments to help combat hair loss and promote natural growth.",
      imageUrl: "/images/treatment-hairloss.jpg",
    },
    {
      title: "Skincare Rejuvenation",
      description:
        "Our skincare treatments are customized for your skin type to rejuvenate and bring back your natural glow.",
      imageUrl: "/images/treatment-skincare.jpg",
    },
    {
      title: "PRP (Platelet Rich Plasma)",
      description:
        "PRP therapy uses your body’s own healing mechanisms to reduce signs of aging and boost skin vitality.",
      imageUrl: "/images/treatment-prp.jpg",
    },
  ];

  return (
    <section className="py-16 px-8" id="aesthetics-treatments">
      <h2 className="text-h2 font-cormorant text-darkgreen mb-6 text-center">
        Aesthetic Treatments
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {treatments.map((treatment, index) => (
          <div key={index} className="rounded-lg shadow-lg overflow-hidden">
            <img
              src={treatment.imageUrl}
              alt={treatment.title}
              className="w-full h-[300px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-h3 font-cormorant text-darkgreen mb-2">
                {treatment.title}
              </h3>
              <p className="text-p text-gray-600 mb-4">
                {treatment.description}
              </p>
              {/* Book Now Button */}
              <a
                href="/booking"
                className="inline-block bg-darkgreen text-luxwhite px-6 py-3 rounded-lg text-lg hover:bg-opacity-80 transition duration-300"
              >
                Book Now
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AestheticTreatments;
