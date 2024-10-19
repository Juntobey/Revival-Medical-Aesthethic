import React from "react";

const VirtualPrice3 = () => {
  return (
    <section className="shadow-lg w-full pt-0 pb-16 bg-beige justify-end">
      {/* Content Container */}
      <div className=" mx-auto w-full pr-0 lg:px-0 lg:pr-0 justify-end">
        {/* Flex container for text and image */}
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Right Side: Image */}
          <div className="w-full lg:w-1/2 lg:pl-0 lg:pr-0 flex justify-start">
            <img
              src={`${process.env.PUBLIC_URL}/virtual-price2.jpeg`}
              alt="Virtual Clinic Option"
              className="w-[600px] h-[900px] object-cover rounded-r-3xl"
              style={{ padding: 0, margin: 0 }}
            />
          </div>
          {/* Left Side: Text Content */}
          <div className="w-full pl-16 lg:w-1/2 lg:pr-12 mb-8 lg:mb-0 flex flex-col justify-center items-center">
            <h2 className="text-h2 font-cormorant text-darkgreen mb-6">
              Booking Options
            </h2>
            <div className="mt-8 text-center">
              <h3 className="text-h3 font-cormorant text-darkgreen mb-4">
                Option Name/Description
              </h3>
              <p className="text-p font-lato text-gray-700 mb-4">
                Paragraph text about the option, service description, or other
                details you want to provide about this virtual clinic booking
                option.
              </p>
              <p className="text-xl font-bold text-darkgreen mb-6">$Price</p>
              {/* Call to Action Button */}
              <a
                href="/booking"
                className="inline-block bg-darkgreen text-luxwhite font-cta font-semibold px-6 py-3 rounded-lg text-lg hover:bg-opacity-80 transition duration-300"
              >
                Schedule A Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualPrice3;
