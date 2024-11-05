// src/components/AdminDashboard/UserProfile.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";

const UserProfile = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    nationality: user.nationality || "",
    birthday: user.birthday || "",
    gender: user.gender || "",
    emergencyContactName: user.emergencyContactName || "",
    emergencyContactNumber: user.emergencyContactNumber || "",
    roleId: user.roleId || 3, // Default to 'Patient'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      // Update user profile details
      const profileResponse = await fetch(
        `http://localhost:3000/profile/${user.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            nationality: formData.nationality,
            birthday: formData.birthday,
            gender: formData.gender,
            emergencyContactName: formData.emergencyContactName,
            emergencyContactNumber: formData.emergencyContactNumber,
          }),
        }
      );

      // Update user role
      const roleResponse = await fetch(
        `http://localhost:3000/role/${user.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roleId: formData.roleId }),
        }
      );

      if (profileResponse.ok && roleResponse.ok) {
        Swal.fire("Updated!", "User profile updated successfully", "success");
        onClose(); // Close the profile view after successful update
      } else {
        Swal.fire("Error", "Failed to update user profile", "error");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire("Error", "Failed to update user profile", "error");
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-darkgreen mb-4">
        User Profile - {formData.firstName} {formData.lastName}
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-bold">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            readOnly // Email is read-only here for security reasons
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold">Nationality:</label>
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold">Birthday:</label>
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold">Gender:</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold">
            Emergency Contact Name:
          </label>
          <input
            type="text"
            name="emergencyContactName"
            value={formData.emergencyContactName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold">
            Emergency Contact Number:
          </label>
          <input
            type="text"
            name="emergencyContactNumber"
            value={formData.emergencyContactNumber}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold">Role:</label>
          <select
            name="roleId"
            value={formData.roleId}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="1">Admin</option>
            <option value="2">Doctor</option>
            <option value="3">Patient</option>
          </select>
        </div>
      </div>
      <div className="mt-4 flex justify-end space-x-4">
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          className="bg-darkgreen text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
