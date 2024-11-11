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
    formData.append("profileId", profileId); // Send profile ID
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
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-darkgreen mb-4">
        Treatment Gallery Management
      </h2>

      <label className="block text-darkgreen font-semibold mb-2">
        Upload Before Image
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e, setBeforeImage, setBeforePreview)}
        className="mb-4"
      />

      <label className="block text-darkgreen font-semibold mb-2">
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
        className="bg-indigo-600 text-white py-2 px-4 rounded-lg mr-4"
      >
        Preview
      </button>
      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white py-2 px-4 rounded-lg"
      >
        Submit
      </button>

      <Popup
        isVisible={isPopupVisible}
        title="Preview Before and After Images"
        message={
          <div>
            {beforePreview && (
              <img
                src={beforePreview}
                alt="Before Preview"
                className="w-full mb-4"
              />
            )}
            {afterPreview && (
              <img src={afterPreview} alt="After Preview" className="w-full" />
            )}
          </div>
        }
        onClose={() => setIsPopupVisible(false)}
      />
    </div>
  );
};

export default TreatmentGalleryManagement;
