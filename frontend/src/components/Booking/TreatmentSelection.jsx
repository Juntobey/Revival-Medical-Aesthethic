import React, { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../../config";

const TreatmentSelection = ({ selectedTreatment, setSelectedTreatment }) => {
  const [treatments, setTreatments] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/treatments`)
      .then(response => setTreatments(response.data))
      .catch(error => console.error("Failed to fetch treatments", error));
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-headers font-semibold text-gray-800 mb-4">
        Choose a Treatment
      </h2>
      {treatments.map((treatmentCategory, index) => (
        <div key={index} className="mb-4">
          <button
            className="w-full text-left p-2 font-semibold text-gray-700 border-b border-gray-300"
            onClick={() => setOpenCategory(openCategory === index ? null : index)}
          >
            {treatmentCategory.category}
          </button>
          {openCategory === index && (
            <ul className="mt-2">
              {treatmentCategory.items.map((item, idx) => (
                <li key={idx} className="my-2">
                  <button
                    onClick={() => setSelectedTreatment({ treatment_name: item.treatment_name, price: item.price })}
                    className={`w-full text-left p-2 rounded-lg border ${
                      selectedTreatment?.treatment_name === item.treatment_name
                        ? "bg-indigo-600 text-white"
                        : "border-gray-300 text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.treatment_name}
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
