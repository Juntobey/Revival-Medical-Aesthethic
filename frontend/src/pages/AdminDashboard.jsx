// src/pages/AdminDashboard.jsx
import React, { useState } from "react";
import Header from "../components/Includes/Header";
import Footer from "../components/Includes/Footer";
import UploadTreatment from "../components/UploadTreatment";

const AdminDashboard = () => {
  // Placeholder state to hold uploaded treatments
  const [treatments, setTreatments] = useState([]);

  const handleUpload = (newTreatment) => {
    setTreatments([newTreatment, ...treatments]); // Add new treatment to the state
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="mt-4 text-lg">Manage your website and user data here.</p>

        {/* Upload Section */}
        <div className="mt-12">
          <UploadTreatment onUpload={handleUpload} />
        </div>

        {/* Display Uploaded Treatments */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold">Uploaded Treatments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {treatments.length === 0 ? (
              <p>No treatments uploaded yet.</p>
            ) : (
              treatments.map((treatment, index) => (
                <div key={index} className="border p-4 rounded-lg shadow">
                  <h3 className="font-bold text-lg">
                    {treatment.treatmentType}
                  </h3>
                  <p>{treatment.description}</p>
                  <div className="mt-4">
                    <p className="font-bold">Before:</p>
                    <img
                      src={treatment.beforeImage}
                      alt="Before treatment"
                      className="w-full h-48 object-cover mt-2"
                    />
                    <p className="font-bold mt-4">After:</p>
                    <img
                      src={treatment.afterImage}
                      alt="After treatment"
                      className="w-full h-48 object-cover mt-2"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
