import React from "react";

const VirtualOp2 = () => {
  return (
    <section className="w-full pt-0 md:pb-0 pb-[50px]">
      {/* Content Container */}
      <div className="max-w-[1295px] mx-auto w-full px-4">
        {/* Section Content */}
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Side: Image */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <img
              src={`${process.env.PUBLIC_URL}/option2-image.jpg`}
              alt="Virtual Clinic Option 2"
              className="md:w-[630px] md:h-[800px] w-full h-[400px] object-cover"
            />
          </div>

          {/* Right Side: Text Content */}
          <div className="w-full lg:w-1/2 lg:pl-8 justify-end">
            <h2 className="md:text-h2 text-[30px] font-bold text-center md:text-left font-headers text-darkgreen mb-6">
              Thorough Wellness Assessments
            </h2>
            <p className="text-p font-paragraph text-gray-700 mb-6">
              Stay proactive about your health with regular, in-depth wellness
              checks tailored to support your ongoing well-being.
            </p>
            {/* Call to Action Button */}
            <a
              href="/booking"
              className="inline-block bg-[#88D5CB] text-luxwhite font-cta px-6 py-3 rounded-lg text-lg hover:bg-opacity-80 transition duration-300"
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualOp2;
