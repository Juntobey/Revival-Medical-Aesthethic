import React, { useState, useEffect } from "react";
import Header from "../components/Includes/Header";
import Footer from "../components/Includes/Footer";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";
import BASE_URL from "../config";

// Helper function to strip '/api' from BASE_URL for image display
const stripApiFromBaseUrl = (url) => url.replace("/api", "");

const ViewTreatments = () => {
  const [transformations, setTransformations] = useState([]);
  const [openIds, setOpenIds] = useState([]);

  // Fetch transformations from the API
  useEffect(() => {
    const fetchTransformations = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/image-uploads/transformations`
        );
        setTransformations(response.data); // Set all transformations
      } catch (error) {
        console.error("Error fetching transformations:", error);
      }
    };

    fetchTransformations();
  }, []);

  // Toggle function for showing/hiding the "After" image section
  const toggleAfterImage = (id) => {
    setOpenIds((prevOpenIds) =>
      prevOpenIds.includes(id)
        ? prevOpenIds.filter((openId) => openId !== id)
        : [...prevOpenIds, id]
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow py-16 px-8 bg-[#f5eadf] shadow-lg animate-fade-in pt-[120px]">
        <div className="text-center">
          <h2 className="text-h3 font-bold font-headers text-darkgreen">
            All Treatments
          </h2>
          <p className="text-lg mt-4 font-paragraph text-gray-600">
            Discover all transformations shared by our clinic.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {transformations.map((transformation) => (
            <div
              key={transformation.id}
              className="bg-luxwhite rounded-lg shadow-lg p-6"
            >
              <div className="flex flex-col space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <img
                    src={`${stripApiFromBaseUrl(BASE_URL)}${
                      transformation.before
                    }`}
                    alt={`Before Treatment ${transformation.id}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <h3 className="text-2xl font-bold font-headers text-darkgreen mt-4">
                    Before Treatment {transformation.id}
                  </h3>
                  <p className="text-gray-600 font-paragraph mt-2">
                    Description before the procedure.
                  </p>
                </div>

                <button
                  onClick={() => toggleAfterImage(transformation.id)}
                  className="mt-2 flex items-center justify-center text-darkgreen"
                >
                  {openIds.includes(transformation.id) ? (
                    <>
                      Hide After Treatment <FaChevronUp className="ml-2" />
                    </>
                  ) : (
                    <>
                      View After Treatment <FaChevronDown className="ml-2" />
                    </>
                  )}
                </button>

                {openIds.includes(transformation.id) && (
                  <div className="border border-gray-200 rounded-lg p-4 mt-4">
                    <img
                      src={`${stripApiFromBaseUrl(BASE_URL)}${
                        transformation.after
                      }`}
                      alt={`After Treatment ${transformation.id}`}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <h3 className="text-2xl font-bold font-headers text-darkgreen mt-4">
                      After Treatment {transformation.id}
                    </h3>
                    <p className="text-gray-600 font-paragraph mt-2">
                      Description of results and improvements.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/booking"
            className="bg-darkgreen text-luxwhite font-cta px-6 py-3 rounded-lg hover:bg-opacity-80 transition-all duration-300"
          >
            Book Your Transformation
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ViewTreatments;
