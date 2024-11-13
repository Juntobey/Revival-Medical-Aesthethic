import React from "react";

const BulletItem = ({ text }) => (
  <div className="flex items-center mb-2">
    {/* Custom Bullet */}
    <span className="w-3 h-3 bg-lightbrown rounded-full mr-4"></span>
    {/* List Text */}
    <p className="text-p font-paragraph text-gray-700">{text}</p>
  </div>
);

const VirtualOp1 = () => {
  return (
    <section className="w-full pt-19 pb-0">
      {/* Content Container */}
      <div className="max-w-[1295px] mx-auto w-full px-4">
        {/* Section Content */}
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Side: Text Content */}
          <div className="w-full lg:w-1/2 lg:pr-8">
            <h2 className="text-h2 font-headers text-darkgreen mb-6">
              Platelet Rich Plasma
            </h2>
            <p className="text-p font-paragraph text-gray-700 mb-6">
              Experience the transformative power of PRP Hair Restoration -
              nature's luxury solution for achieving the vibrant, fuller hair
              you deserve. PRPoptions we offer:
            </p>

            {/* List of Expertise */}
            <div className="grid grid-cols-2 gap-y-2 mb-6">
              <BulletItem text="Repair PRP" />
              <BulletItem text="P-Shot (Priapus Shot)" />
              <BulletItem text="Aesthetic PRP" />
            </div>

            {/* Call to Action Button */}
            <a
              href="/booking"
              className="inline-block bg-lightbrown text-luxwhite font-cta px-6 py-3 rounded-lg text-lg hover:bg-opacity-80 transition duration-300"
            >
              Book Now
            </a>
          </div>

          {/* Right Side: Image */}
          <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
            <img
              src={`${process.env.PUBLIC_URL}/option1-image.jpg`}
              alt="Virtual Clinic Option 1"
              className="w-[630px] h-[800px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualOp1;
