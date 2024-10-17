// src/components/TreatmentGallery.jsx
import React from "react";
import { Link } from "react-router-dom";

// Simulating uploaded transformation images (before and after images)
const transformations = [
  { id: 1, before: "/images/before1.jpg", after: "/images/after1.jpg" },
  { id: 2, before: "/images/before2.jpg", after: "/images/after2.jpg" },
  { id: 3, before: "/images/before3.jpg", after: "/images/after3.jpg" },
  { id: 4, before: "/images/before4.jpg", after: "/images/after4.jpg" },
  { id: 5, before: "/images/before5.jpg", after: "/images/after5.jpg" },
];

// Get the three most recent transformations
const latestTransformations = transformations.slice(-3);

const TreatmentGallery = () => {
  return (
    <section className="py-16 px-8">
      <h2 className="text-4xl font-bold text-gray-800">Treatment Gallery</h2>
      <p className="text-lg mt-4 text-gray-600">
        Explore stunning transformations from our satisfied patients.
      </p>

      {/* Display the three latest transformations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {latestTransformations.map((transformation) => (
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

      <Link
        to="/view-treatments"
        className="mt-6 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 inline-block"
      >
        View the transformations
      </Link>
    </section>
  );
};

export default TreatmentGallery;
