import React from "react";

const VirtualOp3 = () => {
  return (
    <section className="w-full pt-0 pb-0">
      {/* Content Container */}
      <div className="max-w-[1295px] mx-auto w-full px-4">
        {/* Section Content */}
        <div className="flex flex-col-reverse lg:flex-row   items-center">
          {/* Left Side: Text Content */}
          <div className="w-full lg:w-1/2 lg:pr-8">
            <h2 className="md:text-h2 text-[30px] font-bold text-center md:text-left font-headers text-darkgreen mb-6">
              Radiant Skin Awaits
            </h2>
            <p className="text-p font-paragraph text-gray-700 mb-6">
              Indulge in bespoke skincare treatments crafted to rejuvenate and
              restore your natural glow. Experience luxurious, personalized care
              that nurtures and revitalizes, leaving your skin radiant,
              refreshed, and beautifully renewed.
            </p>
            {/* Call to Action Button */}
            <a
              href="/booking"
              className="inline-block bg-[#C98600] text-luxwhite font-cta font px-6 py-3 rounded-lg text-lg hover:bg-opacity-80 transition duration-300"
            >
              Book Now
            </a>
          </div>

          {/* Right Side: Image */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <img
              src={`${process.env.PUBLIC_URL}/option3-image.jpg`}
              alt="Virtual Clinic Option 1"
              className="md:w-[630px] md:h-[800px] w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualOp3;
