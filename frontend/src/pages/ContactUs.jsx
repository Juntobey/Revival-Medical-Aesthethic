import React, { useState } from "react";
import Header from "../components/Includes/Header";
import Footer from "../components/Includes/Footer";

const ContactUs = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", { firstName, lastName, email, message });
  };

  return (
    <>
      <Header />
      {/* Main Section */}
      <div
        className="relative flex flex-col justify-center items-center min-h-screen bg-cover bg-center pt-24" // Added pt-24 for padding from top
        style={{
          backgroundImage: `url('${process.env.PUBLIC_URL}/contact-form.jg')`,
        }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black opacity-30"></div>

        {/* Contact Form with Image */}
        <div className="relative z-10 bg-white max-w-6xl w-full flex rounded-lg shadow-lg overflow-hidden h-[500px]">
          {/* Left Section - Image */}
          <div className="w-1/2 hidden lg:block">
            <img
              src={`${process.env.PUBLIC_URL}/contact-form.jpg`} // Replace with the actual image path
              alt="Contact us"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Section - Contact Form */}
          <div className="w-full lg:w-1/2 p-12 flex flex-col justify-center">
            <h2 className="text-h2 font-headers text-center mb-8 text-[#123524]">
              Contact Us
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <input
                    type="text"
                    className="w-full border-b-2 border-darkgreen border-opacity-50 p-3 focus:outline-none focus:border-b-3 transition-all duration-300"
                    value={firstName}
                    placeholder="First Name" // Placeholder inside the field
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    className="w-full border-b-2 border-darkgreen border-opacity-50 p-3 focus:outline-none focus:border-b-3 transition-all duration-300"
                    value={lastName}
                    placeholder="Last Name" // Placeholder inside the field
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <input
                  type="email"
                  className="w-full border-b-2 border-darkgreen border-opacity-50 p-3 focus:outline-none focus:border-b-3 transition-all duration-300"
                  value={email}
                  placeholder="Email" // Placeholder inside the field
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <textarea
                  className="w-full border-b-2 border-darkgreen border-opacity-50 p-3 focus:outline-none focus:border-b-3 transition-all duration-300"
                  value={message}
                  placeholder="Message" // Placeholder inside the field
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-full lg:w-1/3 bg-[#123524] text-white font-cta py-3 rounded-lg hover:bg-opacity-80 active:bg-opacity-60 transition-all duration-300"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
