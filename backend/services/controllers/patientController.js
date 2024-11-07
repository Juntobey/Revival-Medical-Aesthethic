const User = require("../../authentication/models/user");
const UserProfile = require("../../authentication/models/userProfile");
const Medical_Record = require("../models/medical_record");
const { Op } = require('sequelize');

const getPatientInfo = async (req, res) => {
    try {
      const { searchTerm } = req.query; // Expecting search term in query (e.g. name or condition)
  
      // Fetch patients from the Users table where the role is 'patient' and match the search term
      const patients = await User.findAll({
        where: {
          roleId: 2, // Assuming roleId 2 is for patients
          [Op.or]: [
            { username: { [Op.like]: `%${searchTerm}%` } },
            { email: { [Op.like]: `%${searchTerm}%` } },
          ],
        },
        include: [
          {
            model: UserProfile,
            attributes: ['firstName', 'lastName', 'nationality', 'birthday', 'gender', 'emergencyContactName', 'emergencyContactNumber'],
            required: false,
          },
          {
            model: Medical_Record,
            as: 'MedicalRecords', // Alias used here
            attributes: ['record_id', 'diagnosis', 'treatment', 'prescription'],
            required: false,
          },
        ],
      });
  
      // Map the response and include the 'MedicalRecords' association correctly
      const response = patients.map(patient => ({
        id: patient.id,
        name: `${patient.UserProfile?.firstName} ${patient.UserProfile?.lastName}`,
        email: patient.email,
        profile: patient.UserProfile,
        medicalRecords: patient.MedicalRecords, // Corrected alias here
      }));
  
      res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching patient info:', error);
      res.status(500).json({ message: "Failed to fetch patient information." });
    }
  };
  


  const updatePatientInfo = async (req, res) => {
    const { patientId, recordId } = req.params; // Add recordId as a URL parameter
    const { firstName, lastName, nationality, birthday, gender, emergencyContactName, emergencyContactNumber, diagnosis, treatment, prescription } = req.body;
  
    try {
      // Update the user profile (if provided)
      const userProfile = await UserProfile.update(
        { firstName, lastName, nationality, birthday, gender, emergencyContactName, emergencyContactNumber },
        { where: { userId: patientId } }
      );
  
      // If diagnosis, treatment, or prescription were provided, update the corresponding medical record
      let medicalRecordUpdated = false;
      if (diagnosis || treatment || prescription) {
        const [updatedRecordsCount] = await Medical_Record.update(
          { diagnosis, treatment, prescription },
          { where: { patient_id: patientId, record_id: recordId } } // Update the specific record
        );
        medicalRecordUpdated = updatedRecordsCount > 0;
      }
  
      // Check if any changes were made
      if (userProfile[0] > 0 || medicalRecordUpdated) {
        return res.status(200).json({ message: "Patient information updated successfully" });
      } else {
        return res.status(400).json({ message: "No changes made or patient not found." });
      }
    } catch (error) {
      console.error("Error updating patient info:", error);
      return res.status(500).json({ message: "Failed to update patient information." });
    }
  };
  
  

  module.exports = { getPatientInfo, updatePatientInfo };
  
