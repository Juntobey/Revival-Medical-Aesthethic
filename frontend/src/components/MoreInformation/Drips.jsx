import React from "react";

const Drips = () => {
  const drips = [
    {
      title: "The Boost",
      description:
        "A revitalizing infusion of essential vitamins to boost energy and refresh the body.",
      imageUrl: `${process.env.PUBLIC_URL}/drip-boost.jpg`,
    },
    {
      title: "The Energiser",
      description:
        "An energizing drip containing NAD+ and vitamins, designed to rejuvenate cells and enhance vitality.",
      imageUrl: `${process.env.PUBLIC_URL}/drip-energiser.jpg`,
    },
    {
      title: "The Flu Prevention",
      description:
        "A fortified blend to strengthen immunity, helping to protect against colds and flu.",
      imageUrl: `${process.env.PUBLIC_URL}/drip-flu.jpg`,
    },
    {
      title: "The Ultimate",
      description:
        "A comprehensive drip combining multiple health-boosting ingredients for overall wellness support.",
      imageUrl: `${process.env.PUBLIC_URL}/drip-ultimate.jpg`,
    },
  ];

  return (
    <section
      className="py-16 px-8 animate-fade-in bg-almond"
      id="drip-treatments"
    >
      <h2 className="text-h2 font-headers text-darkgreen mb-6 text-center">
        Drip Treatments
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {drips.map((drip, index) => (
          <div
            key={index}
            className="shadow-lg bg-luxwhite rounded-lg overflow-hidden transform transition hover:scale-105"
          >
            <img
              src={drip.imageUrl}
              alt={drip.title}
              className="w-full h-[300px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-3xl font-headers font-semibold text-darkgreen mb-2">
                {drip.title}
              </h3>
              <p className="text-gray-600 mb-4 font-paragraph">
                {drip.description}
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

export default Drips;
