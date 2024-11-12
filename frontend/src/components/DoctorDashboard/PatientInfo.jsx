import React, { useState, useEffect } from "react";
import BASE_URL from "../../config";

const PatientInfo = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null); // Track the record being edited
  const [editableFields, setEditableFields] = useState({
    diagnosis: "",
    treatment: "",
    prescription: "",
  });

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${BASE_URL}/patients/patients?searchTerm=${searchTerm}`);
        const data = await response.json();
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    // Fetch patients whenever searchTerm changes (or is cleared)
    fetchPatients();
  }, [searchTerm]);

  // Filtering patients based on name or medical record's diagnosis
  const filteredPatients = patients.filter((patient) => {
    const nameMatch = patient.name && patient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const medicalRecordMatch = patient.medicalRecords.some((record) =>
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return nameMatch || medicalRecordMatch;
  });

  const openPatientProfile = (patient) => {
    setSelectedPatient(patient);
    setSelectedRecord(null); // Reset selected record when opening a patient profile
  };

  const openRecordForEdit = (record) => {
    setSelectedRecord(record); // Set the record being edited
    setEditableFields({
      diagnosis: record.diagnosis,
      treatment: record.treatment,
      prescription: record.prescription,
    });
  };

  const handleEditChange = (field, value) => {
    setEditableFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}/patients/patients/${selectedPatient.id}/records/${selectedRecord.record_id}`, // Update the specific record
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editableFields),
        }
      );

      if (response.ok) {
        // Update the records in the UI
        setPatients((prev) =>
          prev.map((patient) =>
            patient.id === selectedPatient.id
              ? {
                  ...patient,
                  medicalRecords: patient.medicalRecords.map((record) =>
                    record.record_id === selectedRecord.record_id
                      ? { ...record, ...editableFields }
                      : record
                  ),
                }
              : patient
          )
        );
        alert("Medical record updated successfully.");
        setSelectedRecord(null); // Close the edit form
      } else {
        console.error("Failed to update medical record");
      }
    } catch (error) {
      console.error("Error updating medical record:", error);
    }
  };

  const handleGoBack = () => {
    setSelectedPatient(null); // Reset the selected patient to show the patient list again
    setSelectedRecord(null); // Clear the selected record (if any)
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-darkgreen mb-4">Patient Information</h2>
      <input
        type="text"
        placeholder="Search by name or condition"
        className="w-full p-2 mb-4 border rounded-lg"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {selectedPatient ? (
        <div className="p-4">
          <button
            onClick={handleGoBack}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg mb-4"
          >
            Go Back to Patient List
          </button>
          <h3 className="text-xl font-semibold">
            Editing {selectedPatient.name}
          </h3>
          <div className="mt-4">
            {/* Displaying and Editing Medical Records */}
            <h4 className="text-lg font-semibold mb-2">Medical Records</h4>
            {selectedPatient.medicalRecords.length === 0 ? (
              <p>No medical records available.</p>
            ) : (
              selectedPatient.medicalRecords.map((record) => (
                <div key={record.record_id} className="mb-2">
                  <p><strong>Diagnosis:</strong> {record.diagnosis}</p>
                  <p><strong>Treatment:</strong> {record.treatment}</p>
                  <p><strong>Prescription:</strong> {record.prescription}</p>
                  <button
                    onClick={() => openRecordForEdit(record)}
                    className="text-indigo-600 underline"
                  >
                    <i className="fas fa-pencil-alt mr-2"></i>Edit Record
                  </button>
                </div>
              ))
            )}
            {/* Displaying form to edit selected record */}
            {selectedRecord && (
              <div className="mt-4">
                <label className="block text-gray-600 font-semibold">Diagnosis</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg mb-4"
                  value={editableFields.diagnosis}
                  onChange={(e) => handleEditChange("diagnosis", e.target.value)}
                />

                <label className="block text-gray-600 font-semibold">Treatment</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg mb-4"
                  value={editableFields.treatment}
                  onChange={(e) => handleEditChange("treatment", e.target.value)}
                />

                <label className="block text-gray-600 font-semibold">Prescription</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-lg mb-4"
                  value={editableFields.prescription}
                  onChange={(e) => handleEditChange("prescription", e.target.value)}
                />

                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setSelectedRecord(null)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="overflow-y-auto max-h-96">
          <ul>
            {filteredPatients.length === 0 ? (
              <li>No patients found matching your search criteria.</li>
            ) : (
              filteredPatients.map((patient) => (
                <li key={patient.id} className="border-b py-2">
                  <p><strong>Name:</strong> {patient.name}</p>
                  <p><strong>Condition:</strong> {patient.medicalRecords[0]?.diagnosis || "No condition listed"}</p>
                  <p><strong>Notes:</strong> {patient.notes || "No notes available"}</p>
                  <button
                    onClick={() => openPatientProfile(patient)}
                    className="text-indigo-600 underline"
                  >
                    View Medical Records
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PatientInfo;
