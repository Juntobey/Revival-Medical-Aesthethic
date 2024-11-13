// src/components/Booking/OperatingHours.jsx

import React from "react";

const OperatingHours = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md text-center mb-6">
      <h2 className="text-2xl font-headers font-bold text-darkgreen mb-4">
        Operating Hours
      </h2>
      <ul className="space-y-2 text-gray-700 font-paragraph">
        <li>
          <strong>Sun:</strong> 10:00 am - 2:00 pm
        </li>
        <li>
          <strong>Mon - Fri:</strong> 9:00 am - 6:00 pm
        </li>
        <li>
          <strong>Sat:</strong> 10:00 am - 2:00 pm
        </li>
      </ul>
    </div>
  );
};

export default OperatingHours;
