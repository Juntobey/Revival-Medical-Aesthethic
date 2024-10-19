// src/components/BackgroundWrapper.jsx
import React from "react";

const BackgroundWrapper = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#EDE1D2] bg-cover bg-center">
      {children}
    </div>
  );
};

export default BackgroundWrapper;
