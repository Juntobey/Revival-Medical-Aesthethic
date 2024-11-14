import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../config";

const TreatmentGallery = () => {
  const [transformations, setTransformations] = useState([]);

  useEffect(() => {
    const fetchTransformations = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/image-uploads/transformations`
        );
        setTransformations(response.data.slice(0, 3)); // Get the three latest transformations
      } catch (error) {
        console.error("Error fetching transformations:", error);
      }
    };

    fetchTransformations();
  }, []);

  const stripApiFromUrl = (url) => {
    return url.replace("/api", "");
  };

  return (
    <section className="py-16 px-8 bg-[#f5eadf] shadow-lg">
      <div className="text-center">
        <h2 className="md:text-h2 text-[30px] font-bold font-headers text-darkgreen">
          Treatment Gallery
        </h2>
        <p className="font-paragraph md:text-xl text-[15px] font-semibold text-darkgreen">
          Explore The Past Treatments
        </p>
      </div>

      {/* Display the fetched transformations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {transformations.map((transformation) => (
          <div
            key={transformation.id}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex flex-col space-y-4">
              {/* Before treatment */}
              <div className="border border-gray-200 rounded-lg p-4">
                <img
                  src={`${stripApiFromUrl(BASE_URL)}${transformation.before}`}
                  alt={`Before Treatment ${transformation.id}`}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="text-2xl font-bold font-headers text-darkgreen mt-4">
                  Before Treatment {transformation.id}
                </h3>
                <p className="text-gray-600 font-paragraph mt-2">
                  Description or story related to the before treatment image.
                </p>
              </div>

              {/* After treatment */}
              <div className="border border-gray-200 rounded-lg p-4">
                <img
                  src={`${stripApiFromUrl(BASE_URL)}${transformation.after}`}
                  alt={`After Treatment ${transformation.id}`}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h3 className="text-2xl font-bold font-headers text-darkgreen mt-4">
                  After Treatment {transformation.id}
                </h3>
                <p className="text-gray-600 font-paragraph mt-2">
                  Description or story related to the after treatment image.
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
          className="bg-darkgreen text-almond font-cta py-2 px-6 rounded-md font-semibold transition-opacity duration-300 hover:opacity-80 focus:outline-none"
        >
          View All Treatments
        </Link>
      </div>
    </section>
  );
};

export default TreatmentGallery;
