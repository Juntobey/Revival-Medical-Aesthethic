// src/components/Popup.jsx
import React from "react";

const Popup = ({ isVisible, title, message, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/3">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="text-gray-700">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-darkgreen text-white px-4 py-2 rounded-lg hover:bg-opacity-80"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Popup;
