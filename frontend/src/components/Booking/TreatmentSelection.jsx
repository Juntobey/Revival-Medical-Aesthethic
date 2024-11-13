import React from "react";

const treatmentCategories = [
  {
    category: "Facial Treatments",
    treatments: [
      { id: 1, name: "Basic Facial" },
      { id: 2, name: "Anti-Aging Facial" },
      { id: 3, name: "Acne Treatment" },
    ],
  },
  {
    category: "Massage Therapies",
    treatments: [
      { id: 4, name: "Swedish Massage" },
      { id: 5, name: "Deep Tissue Massage" },
      { id: 6, name: "Hot Stone Massage" },
    ],
  },
  {
    category: "Virtual Consultations",
    treatments: [
      { id: 7, name: "Virtual Skin Consultation", price: "R50" },
      { id: 8, name: "Virtual Health Assessment", price: "R70" },
    ],
  },
];

const TreatmentSelection = ({
  selectedDate,
  selectedTreatment,
  setSelectedTreatment,
}) => {
  if (!selectedDate) {
    return <p className="text-gray-600">Please select a date first.</p>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Choose a Treatment
      </h2>
      {treatmentCategories.map((category, index) => (
        <div key={index} className="mb-4">
          <h3 className="font-semibold text-gray-700">{category.category}</h3>
          <div className="grid grid-cols-1 gap-2 mt-2">
            {category.treatments.map((treatment) => (
              <button
                key={treatment.id}
                onClick={() => setSelectedTreatment(treatment)}
                className={`p-2 rounded-lg border ${
                  selectedTreatment?.id === treatment.id
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-indigo-100"
                }`}
              >
                {treatment.name}{" "}
                {treatment.price ? `- R${treatment.price}` : ""}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TreatmentSelection;
