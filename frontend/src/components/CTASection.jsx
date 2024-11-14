import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      className="relative flex justify-center items-center text-center h-[445px] bg-cover bg-center"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/CTASection-image.jpeg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",

        height: "445px",
      }}
    >
      {/* Overlay for opacity on the image */}
      <div className="absolute inset-0 bg-almond opacity-40"></div>

      {/* Text Content */}
      <div className="relative z-10 text-darkgreen">
        <h1 className="font-headers md:text-h1 text-[35px] font-bold">
          Natural Beauty Protected,
          <br />
          Natural Beauty Restored
        </h1>
        <p className="font-paragraph md:text-lg text-[17px] mt-4">
          Conservative aesthetic enhancements to honour and maintain the natural
          canvas
        </p>

        {/* Book Now Button */}
        <Link
          to="/booking"
          className="mt-8 bg-darkgreen text-almond font-cta px-6 py-2 font-semibold rounded-lg inline-block hover:bg-opacity-80 transition-all duration-300"
          style={{ marginTop: "20px", marginBottom: "40px" }}
        >
          Book Now
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
