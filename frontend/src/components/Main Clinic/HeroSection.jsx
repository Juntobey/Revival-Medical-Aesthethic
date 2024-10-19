import React from "react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleBookingClick = () => {
    navigate("/booking"); // Navigate to booking page
  };

  return (
    <section className="py-16 px-8 pt-19 h-screen flex justify-center items-center mt-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Left: Image */}
        <div className="md:w-1/2 w-full flex justify-center">
          <img
            src={`${process.env.PUBLIC_URL}/hero-image.jpeg`} // Replace with the actual image path
            alt="Aesthetic Woman"
            className="w-[600px] h-[600px] object-cover rounded-xl" // Update width and height for a more accurate size
          />
        </div>

        {/* Right: Text and Button */}
        <div className="mt-8 md:mt-0 md:w-1/2 text-center md:text-left md:pl-12">
          <h1 className="text-h1 font-headers text-darkgreen lg:text-[65px] xl:text-[70px] font-bold leading-tight mb-4">
            Natural beauty <br />
            protected, <br />
            Natural beauty <br /> restored.
          </h1>
          <p className="text-p font-paragraph text-darkgreen lg:text-[18px] mb-8">
            Conservative aesthetic enhancements to honour and maintain the
            natural canvas.
          </p>

          {/* Button */}
          <button
            onClick={handleBookingClick} // Trigger navigation on click
            className="bg-darkgreen text-almond py-2 px-6 rounded-md font-semibold font-cta transition-opacity duration-300 hover:opacity-80 focus:outline-none"
          >
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
