import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa"; // Importing social icons

const Footer = () => {
  return (
    <footer className="bg-darkgreen text-almond py-4">
      <div className="container mx-auto text-center">
        {/* Social Icons Section */}
        <div className="flex justify-center space-x-6 mb-2">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition duration-300"
          >
            <FaFacebookF size={20} className="text-[#1656d6]" />{" "}
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition duration-300"
          >
            <FaInstagram size={20} className="text-[#C13584]" />{" "}
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition duration-300"
          >
            <img
              src={`${process.env.PUBLIC_URL}/logo-white.png`}
              alt="X"
              className="w-5 h-5"
            />
          </a>
        </div>

        {/* Copyright Section */}
        <p className="text-sm mt-2">
          &copy; {new Date().getFullYear()} Revival Aesthetics. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
