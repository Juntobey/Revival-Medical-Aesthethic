import React, { useState } from "react";
import Header from "../components/Includes/Header";
import Footer from "../components/Includes/Footer";
import Swal from "sweetalert2"; // Import SweetAlert2

const ContactUs = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", { firstName, lastName, email, message });

    // Show success notification
    Swal.fire({
      title: "Message Sent!",
      text: "Your message has been successfully sent. We will get back to you shortly.",
      icon: "success",
      confirmButtonText: "OK",
      timer: 3000,
    });

    // Clear form fields after submission
    setFirstName("");
    setLastName("");
    setEmail("");
    setMessage("");
  };

  return (
    <>
      <Header />
      {/* Main Section */}
      <div className="relative flex flex-col justify-center items-center min-h-screen bg-almond pt-24 pb-24">
        {/* Contact Details Section */}
        <div className="text-center mb-8">
          <h2 className="text-h2 font-headers text-darkgreen">Get in Touch</h2>
          <p className="text-lg font-paragraph text-gray-700 mt-2">
            We'd love to hear from you. Reach out to us through any of the
            following contact details:
          </p>
          <div className="mt-4 space-y-2">
            <p className="text-gray-600 font-paragraph">
              📍 Second floor Room B3, Health and Wellness Center, 353 Rivonia
              Blvd, Rivonia, Sandton, 2191
            </p>
            <p className="text-gray-600 font-paragraph">📞 +27 73 354 5232</p>
            <p className="text-gray-600 font-paragraph">
              📧 revivalsandton@icloud.com
            </p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-white max-w-6xl w-full flex rounded-lg shadow-lg overflow-hidden h-[500px]">
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
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <input
                    type="text"
                    className="w-full border-b-2 border-darkgreen border-opacity-50 p-3 focus:outline-none focus:border-b-3 transition-all duration-300"
                    value={firstName}
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    className="w-full border-b-2 border-darkgreen border-opacity-50 p-3 focus:outline-none focus:border-b-3 transition-all duration-300"
                    value={lastName}
                    placeholder="Last Name"
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
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <textarea
                  className="w-full border-b-2 border-darkgreen border-opacity-50 p-3 focus:outline-none focus:border-b-3 transition-all duration-300"
                  value={message}
                  placeholder="Message"
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
