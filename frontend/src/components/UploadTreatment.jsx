// src/components/UploadTreatment.jsx
import React, { useState } from "react";

const UploadTreatment = ({ onUpload }) => {
  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [treatmentType, setTreatmentType] = useState("");
  const [description, setDescription] = useState("");

  const handleBeforeImageChange = (e) => {
    setBeforeImage(URL.createObjectURL(e.target.files[0])); // Create a local URL for preview
  };

  const handleAfterImageChange = (e) => {
    setAfterImage(URL.createObjectURL(e.target.files[0])); // Create a local URL for preview
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTreatment = {
      beforeImage,
      afterImage,
      treatmentType,
      description,
    };

    // Call the onUpload function passed from the parent to update the state
    onUpload(newTreatment);

    // Reset the form
    setBeforeImage(null);
    setAfterImage(null);
    setTreatmentType("");
    setDescription("");
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6">
        Upload Before & After Treatment
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Treatment Type
          </label>
          <input
            type="text"
            value={treatmentType}
            onChange={(e) => setTreatmentType(e.target.value)}
            placeholder="Enter treatment type"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a short description"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Before Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleBeforeImageChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            After Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleAfterImageChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#1B2E22] text-white py-2 px-6 rounded-md hover:bg-[#162519]"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadTreatment;
