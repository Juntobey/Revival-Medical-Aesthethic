import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa"; // Importing social icons

const Footer = () => {
  return (
    <footer className="bg-[#1B2E22] text-[#EDE1D2] py-4">
      <div className="container mx-auto text-center">
        {/* Social Icons Section */}
        <div className="flex justify-center space-x-6 mb-2">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition duration-300"
          >
            <FaFacebookF size={20} className="text-[#4267B2]" />{" "}
            {/* Facebook Blue */}
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition duration-300"
          >
            <FaInstagram size={20} className="text-[#C13584]" />{" "}
            {/* Instagram Pink */}
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition duration-300"
          >
            <FaTwitter size={20} className="text-[#1DA1F2]" />{" "}
            {/* Twitter Blue */}
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
