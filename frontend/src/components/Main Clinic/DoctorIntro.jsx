import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorIntro = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleBookingClick = () => {
    navigate("/booking"); // Navigate to booking page
  };

  return (
    <section className="py-16 px-8">
      <div className="container mx-auto flex flex-col md:flex-row-reverse items-center justify-between">
        {/* Left (Image) */}
        <div className="md:w-1/2 w-full flex justify-center">
          <img
            src={`${process.env.PUBLIC_URL}/doctor-image.jpg`} // Replace this with the correct image path
            alt="Doctor Performing Treatment"
            className="w-[600px] h-[600px] object-cover rounded-xl" // Adjust the width and height if necessary
          />
        </div>

        {/* Right (Text and Button) */}
        <div className="mt-8 md:mt-0 md:w-1/2 text-center md:text-left md:pl-12">
          <h1 className="text-h1 font-headers text-darkgreen lg:text-[60px] xl:text-[65px] leading-tight mb-4">
            Dr Azhar
          </h1>
          <p className="text-p font-paragraph text-darkgreen lg:text-[18px] mb-8">
            Doctors intro instilling trust and introducing time stamps,
            conversational section image and text to be provided.
          </p>

          {/* Button */}
          <button
            onClick={handleBookingClick} // Trigger navigation on click
            className="bg-darkgreen text-almond font-cta py-2 px-6 rounded-md font-semibold font-raleway transition-opacity duration-300 hover:opacity-80 focus:outline-none"
          >
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default DoctorIntro;
