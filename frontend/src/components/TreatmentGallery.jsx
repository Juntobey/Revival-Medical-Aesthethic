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
    <section className="py-16 px-8 bg-[#f5eadf] shadow-lg">
      <div className="text-center">
        <h2 className="text-h2 font-headers text-darkgreen">
          Treatment Gallery
        </h2>
        <p className="text-p mt-2 font-paragraph text-darkgreen">
          Explore The Past Treatments
        </p>
      </div>

      {/* Display the three latest transformations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {latestTransformations.map((transformation) => (
          <div
            key={transformation.id}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex flex-col space-y-4">
              {/* Before treatment */}
              <div className="border border-gray-200 rounded-lg p-4">
                <img
                  src={transformation.before}
                  alt={`Before Treatment ${transformation.id}`}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="text-2xl font-bold font-headers text-darkgreen mt-4">
                  Before Treatment {transformation.id}
                </h3>
                <p className="text-gray-600 font-paragraph mt-2">
                  Body text for whatever you'd like to say. Add main takeaway
                  points, quotes, anecdotes, or even a very short story.
                </p>
              </div>

              {/* After treatment */}
              <div className="border border-gray-200 rounded-lg p-4">
                <img
                  src={transformation.after}
                  alt={`After Treatment ${transformation.id}`}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="text-2xl font-bold font-headers text-darkgreen mt-4">
                  After Treatment {transformation.id}
                </h3>
                <p className="text-gray-600 font-paragraph mt-2">
                  Body text for whatever you'd like to say. Add main takeaway
                  points, quotes, anecdotes, or even a very short story.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Treatments Button */}
      <div className="text-center mt-12">
        <Link
          to="/view-treatments"
          className="mt-6 bg-darkgreen font-cta text-luxwhite px-6 py-3 rounded-lg hover:bg-opacity-80 inline-block transition-all duration-300"
        >
          View All Treatments
        </Link>
      </div>
    </section>
  );
};

export default TreatmentGallery;
