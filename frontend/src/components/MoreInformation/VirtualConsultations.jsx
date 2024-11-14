import React from "react";

const VirtualConsultations = () => {
  return (
    <section className="py-16 px-8">
      <div className="flex flex-col lg:flex-row items-center">
        {/* Left Side: Text */}
        <div className="w-full lg:w-1/2 lg:pr-8">
          <h2 className="md:text-h2 text-[35px] font-bold font-headers text-darkgreen mb-6">
            Virtual Consultations
          </h2>
          <p className="text-p font-paragraph text-gray-600 mb-6">
            Our virtual consultations offer a convenient way for you to receive
            expert advice from our doctors without needing to leave your home.
          </p>
          <ul className="list-disc pl-6 mb-6 font-paragraph">
            <li>
              Consultations available for both aesthetic and general practice
              treatments.
            </li>
            <li>Secure video conferencing for all virtual sessions.</li>
            <li>
              Follow-up treatments, advice, and prescriptions offered as needed.
            </li>
          </ul>
          {/* Schedule a Consultation Button */}
          <a
            href="/virtual-clinic"
            className="inline-block bg-darkgreen text-luxwhite font-cta px-6 py-3 rounded-lg text-lg hover:bg-opacity-80 transition duration-300"
          >
            Schedule a Consultation
          </a>
        </div>
        {/* Right Side: Image */}
        <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
          <img
            src={`${process.env.PUBLIC_URL}/virtualc-image.jpg`}
            alt="Virtual Consultation"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default VirtualConsultations;
