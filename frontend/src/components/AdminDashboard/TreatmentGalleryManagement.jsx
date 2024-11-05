// src/components/AdminDashboard/TreatmentGalleryManagement.jsx
import React, { useState } from "react";
import Popup from "../Popup";

const TreatmentGalleryManagement = () => {
  const [beforePreview, setBeforePreview] = useState(null);
  const [afterPreview, setAfterPreview] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handlePreview = () => setIsPopupVisible(true);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-darkgreen mb-4">
        Treatment Gallery Management
      </h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setBeforePreview(URL.createObjectURL(e.target.files[0]))
        }
        className="mb-4"
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setAfterPreview(URL.createObjectURL(e.target.files[0]))
        }
        className="mb-4"
      />
      <button
        onClick={handlePreview}
        className="bg-indigo-600 text-white py-2 px-4 rounded-lg"
      >
        Preview
      </button>
      <Popup
        isVisible={isPopupVisible}
        title="Preview Before and After Images"
        message={
          <div>
            <img
              src={beforePreview}
              alt="Before Preview"
              className="w-full mb-4"
            />
            <img src={afterPreview} alt="After Preview" className="w-full" />
          </div>
        }
        onClose={() => setIsPopupVisible(false)}
      />
    </div>
  );
};

export default TreatmentGalleryManagement;
