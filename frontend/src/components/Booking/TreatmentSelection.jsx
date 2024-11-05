import React, { useState } from "react";

const treatments = [
  {
    category: "GP Consultation",
    items: ["Weekdays 9am - 5pm", "Weekends 10am - 2pm"],
  },
  {
    category: "Facial Rejuvenation",
    items: [
      "Vampire Facial (PRP)",
      "Botox",
      "Filler",
      "Threads",
      "PLLA (Sculptra) - Plejuv",
      "Etrebelle 50",
      "Etrebelle 200",
    ],
  },
  {
    category: "Hair Loss",
    items: [
      "PRP Therapy X1 session",
      "PRP Therapy X3 sessions (Up front)",
      "PRP Therapy X6 sessions (Up front)",
      "Meso Therapy",
      "Transplant FUE Consult",
      "Transplant FUE Procedure",
    ],
  },
  {
    category: "Drips",
    items: [
      "The Boost",
      "The Boost Rehydrate",
      "The Energiser",
      "The Energiser Rehydrate",
      "The Flu Prevention",
      "The Glow",
      "The Back Ache",
      "The Ultimate",
    ],
  },
  {
    category: "Add-ons",
    items: [
      "Immune Boost - Vitamin C",
      "Cold and Flu Prevention - Heel Echinacea",
      "Glow and Repair - Glutathione",
      "Energy - NAD+",
      "Nerve Pain - Pyridoxine (Vitamin B6)",
      "Anti-Inflammatory - Xefo",
    ],
  },
  {
    category: "Injections",
    items: [
      "Voltaren (Anti-Inflammatory)",
      "Celestone 2ml",
      "Dexona 1ml",
      "Back Pain Combo",
    ],
  },
  {
    category: "Repair P.R.P.",
    items: ["X1 session", "X3 sessions (Up front)", "X6 sessions (Up front)"],
  },
  {
    category: "Birth Control",
    items: [
      "Depo-Provera injection (3 Monthly)",
      "Nur-isterate injection (2 Monthly)",
      "Implant (3 Years)",
      "Copper-T IUD (5 Years)",
      "Hormonal IUD (5 Years)",
    ],
  },
];

const TreatmentSelection = ({ selectedTreatment, setSelectedTreatment }) => {
  const [openCategory, setOpenCategory] = useState(null);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-headers font-semibold text-gray-800 mb-4">
        Choose a Treatment
      </h2>
      {treatments.map((treatmentCategory, index) => (
        <div key={index} className="mb-4">
          <button
            className="w-full text-left p-2 font-semibold text-gray-700 border-b border-gray-300"
            onClick={() =>
              setOpenCategory(openCategory === index ? null : index)
            }
          >
            {treatmentCategory.category}
          </button>
          {openCategory === index && (
            <ul className="mt-2">
              {treatmentCategory.items.map((item, idx) => (
                <li key={idx} className="my-2">
                  <button
                    onClick={() => setSelectedTreatment(item)}
                    className={`w-full text-left p-2 rounded-lg border ${
                      selectedTreatment === item
                        ? "bg-indigo-600 text-white"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default TreatmentSelection;
