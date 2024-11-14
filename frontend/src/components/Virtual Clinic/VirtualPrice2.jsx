import React from "react";

const VirtualPrice2 = () => {
  return (
    <section className="w-full pt-16 px-[10px] md:px-0 bg-beige justify-end">
      {/* Content Container */}
      <div className=" mx-auto w-full pr-0 lg:px-0 lg:pr-0 justify-end">
        {/* Flex container for text and image */}
        <div className="flex flex-col-reverse lg:flex-row items-center">
          {/* Left Side: Text Content */}
          <div className="w-full md:pl-16 lg:w-1/2 lg:pr-12 mb-8 lg:mb-0 flex flex-col justify-center items-center text-center">
            <h2 className="md:text-h2 text-[30px] font-bold font-headers text-darkgreen mb-6">
              Comprehensive Virtual Consultation
            </h2>
            <div className="mt-8 text-center">
              <div className="text-p font-paragraph text-gray-700 mb-4 text-center">
                <ul className="list-disc pl-4 md:pl-0 text-left space-y-2 text-paragraph">
                  <li>
                    15-minute focused telehealth consultation with the Doctor
                  </li>
                  <li>Prescription provided if medically necessary</li>
                  <li>One complimentary follow-up appointment</li>
                  <li>Blood work analysis included</li>
                  <li>Referral letter provided if required</li>
                </ul>
                <div className="mt-4 text-sm text-gray-600">
                  <p className="italic">Package Includes Essential Services:</p>
                  <ul className="list-disc text-left text-p pl-4 space-y-1 mt-2">
                    <li>Follow-up appointments</li>
                    <li>Laboratory tests</li>
                    <li>Referral documentation</li>
                    <li>WhatsApp communication</li>
                  </ul>
                </div>
              </div>
              <p className="text-xl font-bold text-darkgreen mb-6">
                Price: R1050
              </p>
            </div>
            {/* Call to Action Button */}
            <a
              href="/booking"
              className="inline-block bg-darkgreen text-luxwhite font-cta px-6 py-3 rounded-lg text-lg hover:bg-opacity-80 transition duration-300"
            >
              Schedule A Consultation
            </a>
          </div>

          {/* Right Side: Image */}
          <div className="w-full lg:w-1/2 lg:pl-0 lg:pr-0 flex justify-end">
            <img
              src={`${process.env.PUBLIC_URL}/virtual-price3.jpeg`}
              alt="Virtual Clinic Option"
              className="w-full h-[400px] object-cover md:rounded-l-3xl md:w-[600px] md:h-[900px]"
              style={{ padding: 0, margin: 0 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualPrice2;
