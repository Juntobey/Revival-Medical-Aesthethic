// src/pages/Fallback.jsx
import React from "react";

const Fallback = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-h2 font-headers font-bold text-darkgreen mb-4">
        We'll Be Back Soon!
      </h1>
      <p className="text-p font-paragraph text-gray-700 mb-6">
        Our website is currently undergoing maintenance. We apologize for any
        inconvenience and appreciate your patience.
      </p>
      <p className="text-gray-500">
        If you need immediate assistance, please contact us at{" "}
        <a
          href="mailto:revivalsandton@icloud.com"
          className="text-indigo-600 underline"
        >
          revivalsandton@icloud.com
        </a>
      </p>
    </div>
  );
};

export default Fallback;
