import React from "react";

const VirtualPrice1 = () => {
  return (
    <section className="w-full py-0 bg-beige justify-end">
      {/* Content Container */}
      <div className=" mx-auto w-full pr-0 lg:px-0 lg:pr-0 justify-end">
        {/* Flex container for text and image */}
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Side: Text Content */}
          <div className="w-full pl-16 lg:w-1/2 lg:pr-12 mb-8 lg:mb-0 flex flex-col justify-center items-center">
            <h2 className="text-h2 font-headers text-darkgreen mb-6">
              Booking Options
            </h2>
            <div className="mt-8 text-center">
              <h3 className="text-h3 font-headers text-darkgreen mb-4">
                Option Name/Description
              </h3>
              <p className="text-p font-paragraph text-gray-700 mb-4">
                Paragraph text about the option, service description, or other
                details you want to provide about this virtual clinic booking
                option.
              </p>
              <p className="text-xl font-bold text-darkgreen mb-6">
                Price:R---
              </p>
              {/* Call to Action Button */}
              <a
                href="/booking"
                className="inline-block bg-darkgreen text-luxwhite font-cta  px-6 py-3 rounded-lg text-lg hover:bg-opacity-80 transition duration-300"
              >
                Schedule A Consultation
              </a>
            </div>
          </div>

          {/* Right Side: Image */}
          <div className="w-full lg:w-1/2 lg:pl-0 lg:pr-0 flex justify-end">
            <img
              src={`${process.env.PUBLIC_URL}/virtual-price3.jpeg`}
              alt="Virtual Clinic Option"
              className="w-[600px] h-[900px] object-cover rounded-l-3xl"
              style={{ padding: 0, margin: 0 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualPrice1;
