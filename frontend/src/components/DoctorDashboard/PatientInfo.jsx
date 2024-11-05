// src/components/DoctorDashboard/PatientInfo.jsx
import React, { useState, useEffect } from "react";

const PatientInfo = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editableFields, setEditableFields] = useState({
    notes: "",
    condition: "",
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/patients"); // API endpoint to fetch patients
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openPatientProfile = (patient) => {
    setSelectedPatient(patient);
    setEditableFields({ notes: patient.notes, condition: patient.condition });
  };

  const handleEditChange = (field, value) => {
    setEditableFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/patients/${selectedPatient.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editableFields),
        }
      );

      if (response.ok) {
        setPatients((prev) =>
          prev.map((patient) =>
            patient.id === selectedPatient.id
              ? { ...patient, ...editableFields }
              : patient
          )
        );
        alert("Patient information updated successfully.");
        setSelectedPatient(null);
      } else {
        console.error("Failed to update patient information");
      }
    } catch (error) {
      console.error("Error updating patient information:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-darkgreen mb-4">
        Patient Information
      </h2>
      <input
        type="text"
        placeholder="Search by name or condition"
        className="w-full p-2 mb-4 border rounded-lg"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {selectedPatient ? (
        <div className="p-4">
          <h3 className="text-xl font-semibold">
            Editing {selectedPatient.name}
          </h3>
          <div className="mt-4">
            <label className="block text-gray-600 font-semibold">
              Condition
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg mb-4"
              value={editableFields.condition}
              onChange={(e) => handleEditChange("condition", e.target.value)}
            />

            <label className="block text-gray-600 font-semibold">Notes</label>
            <textarea
              className="w-full p-2 border rounded-lg mb-4"
              rows="4"
              value={editableFields.notes}
              onChange={(e) => handleEditChange("notes", e.target.value)}
            ></textarea>

            <button
              onClick={handleSave}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
            >
              Save Changes
            </button>
            <button
              onClick={() => setSelectedPatient(null)}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="overflow-y-auto max-h-96">
          <ul>
            {filteredPatients.map((patient) => (
              <li key={patient.id} className="border-b py-2">
                <p>
                  <strong>Name:</strong> {patient.name}
                </p>
                <p>
                  <strong>Condition:</strong> {patient.condition}
                </p>
                <p>
                  <strong>Notes:</strong> {patient.notes}
                </p>
                <button
                  onClick={() => openPatientProfile(patient)}
                  className="text-indigo-600 underline"
                >
                  View & Edit
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PatientInfo;
