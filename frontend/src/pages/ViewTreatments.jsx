// src/pages/ViewTreatments.jsx
import React from "react";

// Simulating uploaded transformation images (before and after images)
const transformations = [
  { id: 1, before: "/images/before1.jpg", after: "/images/after1.jpg" },
  { id: 2, before: "/images/before2.jpg", after: "/images/after2.jpg" },
  { id: 3, before: "/images/before3.jpg", after: "/images/after3.jpg" },
  { id: 4, before: "/images/before4.jpg", after: "/images/after4.jpg" },
  { id: 5, before: "/images/before5.jpg", after: "/images/after5.jpg" },
];

const ViewTreatments = () => {
  return (
    <section className="py-16 px-8">
      <h2 className="text-4xl font-bold text-gray-800">All Transformations</h2>
      <p className="text-lg mt-4 text-gray-600">
        View all the amazing transformations from our satisfied patients.
      </p>

      {/* Display all uploaded transformations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {transformations.map((transformation) => (
          <div key={transformation.id} className="flex flex-col">
            <img
              src={transformation.before}
              alt={`Before treatment ${transformation.id}`}
              className="w-full h-64 object-cover"
            />
            <img
              src={transformation.after}
              alt={`After treatment ${transformation.id}`}
              className="w-full h-64 object-cover mt-2"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ViewTreatments;
