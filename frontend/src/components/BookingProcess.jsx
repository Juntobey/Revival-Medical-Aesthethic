import React from "react";
import { FaCalendarAlt, FaCreditCard, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const BookingProcess = () => {
  return (
    <section className="py-16 max-w-[1440px] mx-auto">
      <div className="container mx-auto max-w-[1295px] px-4">
        <h2 className="text-h1 font-headers text-darkgreen text-center font-cormorant mb-[100PX]">
          Booking Process
        </h2>

        {/* Flex container for the booking steps */}
        <div className="flex justify-center space-x-8 flex-wrap">
          {/* Box 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-1/3 md:w-1/4 relative mb-8">
            <div className="bg-darkgreen w-12 h-12 rounded-md absolute -top-6 left-6 flex items-center justify-center">
              <FaCheck className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-semibold font-headers text-darkgreen mt-8 font-cormorant">
              Choose Treatment
            </h3>
            <p className="mt-4 text-p text-darkgreen font-paragraph">
              Select your the type of service you want on the booking page .
            </p>
          </div>

          {/* Box 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-1/3 md:w-1/4 relative mb-8">
            <div className="bg-[#c09d80] w-12 h-12 rounded-md absolute -top-6 left-6 flex items-center justify-center">
              <FaCalendarAlt className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-headers font-semibold text-darkgreen mt-8 font-cormorant">
              Select Date
            </h3>
            <p className="mt-4 text-p text-darkgreen font-paragraph">
              Choose a convenient date and time for your appointment.
            </p>
          </div>

          {/* Box 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-full sm:w-1/3 md:w-1/4 relative mb-8">
            <div className="bg-[#70312d] w-12 h-12 rounded-md absolute -top-6 left-6 flex items-center justify-center">
              <FaCreditCard className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-headers font-semibold text-darkgreen mt-8 ">
              Confirm Payment
            </h3>
            <p className="mt-4 text-p text-darkgreen font-paragraph">
              Proceed with secure payment to confirm your booking.
            </p>
          </div>
        </div>

        {/* Book Now Button */}
        <div className="flex justify-center mt-12">
          <Link
            to="/booking"
            className="bg-darkgreen font-cta text-luxwhite px-6 py-3 rounded-lg hover:bg-opacity-80 inline-block transition-all duration-300"
          >
            Book Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BookingProcess;
