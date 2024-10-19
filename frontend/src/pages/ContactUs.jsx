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
    // Logic for handling form submission
    console.log("Form submitted", { firstName, lastName, email, message });
  };

  return (
    <>
      <Header />
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow flex justify-center items-center bg-gray-100">
          <div className="flex max-w-4xl mx-auto w-full">
            {/* Left Section - Image */}
            <div className="w-1/2 hidden lg:block">
              <img
                src={`${process.env.PUBLIC_URL}/contact-form.jpg`}
                alt="Contact us"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Section - Contact Form */}
            <div className="w-full lg:w-1/2 bg-white p-12 shadow-lg">
              <h2 className="text-4xl font-bold mb-8 text-[#123524]">
                Contact Us
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block text-[#123524]">First Name</label>
                    <input
                      type="text"
                      className="border-[#123524] w-full p-2 rounded border-opacity-50"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-[#123524]">Last Name</label>
                    <input
                      type="text"
                      className="border-[#123524] w-full p-2 rounded border-opacity-50"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#123524]">Email</label>
                  <input
                    type="email"
                    className="border-[#123524] w-full p-2 rounded border-opacity-50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#123524]">Message</label>
                  <textarea
                    className="border-[#123524] w-full p-2 rounded border-opacity-50 h-32 resize-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#123524] text-white py-3 rounded-lg hover:bg-opacity-80 active:bg-opacity-60 transition-all duration-300"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ContactUs;
