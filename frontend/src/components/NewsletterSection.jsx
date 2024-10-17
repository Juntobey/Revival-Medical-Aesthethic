import React from "react";

const NewsletterSection = () => {
  return (
    <section
      className="py-16 px-8 flex flex-col md:flex-row justify-between items-center"
      style={{
        backgroundColor: "#AF937B",
      }}
    >
      {/* Text and Form Section */}
      <div className="max-w-2xl md:w-1/2">
        <h2 className="text-4xl font-bold text-[#43251d]">
          Stay Updated with Our Newsletter
        </h2>
        <p className="text-lg mt-4 text-[#6e4d44]">
          Subscribe to receive the latest updates, exclusive offers, and
          promotions directly to your inbox.
        </p>

        <form className="mt-6 flex flex-col md:flex-row items-center md:space-x-4 space-y-4 md:space-y-0">
          <input
            type="email"
            placeholder="Your Email Here"
            className="w-full md:w-auto flex-grow border-2 border-gray-400 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <button
            type="submit"
            className="bg-[#1B2E22] text-white px-6 py-3 rounded-lg hover:bg-[#162519]"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-2 text-sm text-gray-600">
          By clicking Sign Up, you confirm your agreement with our{" "}
          <span className="underline">Terms and Conditions</span>.
        </p>
      </div>

      {/* Image Section */}
      <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center">
        <div
          className="w-full h-full md:w-96 md:h-56 bg-cover bg-center  shadow-md"
          style={{
            backgroundImage: `url('/newsletter-section.jpeg')`, // Adjusted path
            backgroundSize: "cover",
          }}
        ></div>
      </div>
    </section>
  );
};

export default NewsletterSection;
