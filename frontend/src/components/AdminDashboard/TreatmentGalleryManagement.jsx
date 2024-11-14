import React, { useState } from "react";
import Popup from "../Popup";
import axios from "axios";
import BASE_URL from "../../config";

const TreatmentGalleryManagement = ({ profileId }) => {
  const [beforePreview, setBeforePreview] = useState(null);
  const [afterPreview, setAfterPreview] = useState(null);
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handlePreview = () => setIsPopupVisible(true);

  const handleImageUpload = (event, setImage, setPreview) => {
    const file = event.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    if (!beforeImage || !afterImage) {
      alert("Please upload both before and after images.");
      return;
    }

    const formData = new FormData();
    formData.append("profileId", profileId);
    formData.append("before", beforeImage);
    formData.append("after", afterImage);

    try {
      await axios.post(
        `${BASE_URL}/image-uploads/upload-transformation`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Images uploaded successfully!");
      setBeforeImage(null);
      setAfterImage(null);
      setBeforePreview(null);
      setAfterPreview(null);
    } catch (error) {
      console.error("Error uploading images:", error);
      alert("Failed to upload images. Please try again.");
    }
  };

  return (
    <div className="bg-luxwhite p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-headers font-bold text-darkgreen mb-4">
        Treatment Gallery Management
      </h2>

      <label className="block text-darkgreen font-paragraph font-semibold mb-2">
        Upload Before Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e, setBeforeImage, setBeforePreview)}
        className="mb-4"
      />

      <label className="block text-darkgreen font-paragraph font-semibold mb-2">
        Upload After Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e, setAfterImage, setAfterPreview)}
        className="mb-4"
      />

      <button
        onClick={handlePreview}
        className="bg-lightbrown text-luxwhite font-cta py-2 px-4 rounded-lg mr-4"
      >
        Preview
      </button>
      <button
        onClick={handleSubmit}
        className="bg-green-500 font-cta text-luxwhite py-2 px-4 rounded-lg"
      >
        Submit
      </button>

      <Popup
        isVisible={isPopupVisible}
        title="Preview Before and After Images"
        message={
          <div className="flex flex-col items-center max-h-[80vh] overflow-auto">
            {beforePreview && (
              <img
                src={beforePreview}
                alt="Before Preview"
                className="w-full max-w-xs md:max-w-md lg:max-w-lg object-contain mb-4"
              />
            )}
            {afterPreview && (
              <img
                src={afterPreview}
                alt="After Preview"
                className="w-full max-w-xs md:max-w-md lg:max-w-lg object-contain"
              />
            )}
          </div>
        }
        onClose={() => setIsPopupVisible(false)}
      />
    </div>
  );
};

export default TreatmentGalleryManagement;
