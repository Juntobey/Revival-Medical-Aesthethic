import React from "react";
import { FaMapMarkerAlt, FaCalendarAlt, FaCreditCard } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for navigation

const BookingProcess = () => {
  return (
    <section className="py-16 ">
      <div className="container mx-auto">
        <h2 className="text-5xl font-bold text-center text-darkgreen font-cormorant mb-12">
          Booking Process
        </h2>

        <div className="flex justify-center space-x-8">
          {/* Box 1 */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 relative">
            <div className="bg-darkgreen w-12 h-12 rounded-md absolute -top-6 left-6 flex items-center justify-center">
              <FaMapMarkerAlt className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-darkgreen mt-8 font-cormorant">
              Choose Location
            </h3>
            <p className="mt-4 text-lg text-gray-600 font-lato">
              Select your preferred clinic location where you'd like to have
              your treatment.
            </p>
          </div>

          {/* Box 2 */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 relative">
            <div className="bg-[#c09d80] w-12 h-12 rounded-md absolute -top-6 left-6 flex items-center justify-center">
              <FaCalendarAlt className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-darkgreen mt-8 font-cormorant">
              Select Date
            </h3>
            <p className="mt-4 text-lg text-gray-600 font-lato">
              Choose a convenient date and time for your appointment.
            </p>
          </div>

          {/* Box 3 */}
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3 relative">
            <div className="bg-[#70312d] w-12 h-12 rounded-md absolute -top-6 left-6 flex items-center justify-center">
              <FaCreditCard className="text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-darkgreen mt-8 font-cormorant">
              Confirm Payment
            </h3>
            <p className="mt-4 text-lg text-gray-600 font-lato">
              Proceed with secure payment to confirm your booking.
            </p>
          </div>
        </div>

        {/* Book Now Button */}
        <div className="flex justify-center mt-12">
          <Link
            to="/booking" // Replace this with your booking page route
            className="hover:bg-white hover:text-darkgreen font-bold py-3 px-8 border hover:border-darkgreen rounded-lg bg-darkgreen text-white transition duration-300"
          >
            Book Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BookingProcess;
