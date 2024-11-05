import React from "react";

const AddOns = () => {
  const addOns = [
    {
      title: "Immune Boost",
      description: "Vitamin C infusion to strengthen immunity.",
    },
    {
      title: "Glow and Repair",
      description: "Glutathione infusion to promote skin radiance.",
    },
    {
      title: "Energy Boost",
      description: "NAD+ infusion to enhance energy levels.",
    },
    {
      title: "Anti-inflammatory",
      description: "Xefo injection to alleviate inflammation and pain.",
    },
  ];

  return (
    <section className="py-16 px-8">
      <h2 className="text-h2 font-headers text-darkgreen mb-6 text-center">
        Add-On Treatments
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {addOns.map((addOn, index) => (
          <div
            key={index}
            className="shadow-lg rounded-lg overflow-hidden bg-white p-6"
          >
            <h3 className="text-3xl font-semibold font-headers text-darkgreen mb-2">
              {addOn.title}
            </h3>
            <p className="text-p font-paragraph text-gray-600">
              {addOn.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AddOns;
