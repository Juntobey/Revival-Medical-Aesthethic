// src/components/AdminDashboard/UserProfile.jsx
import React, { useState } from "react";
import Swal from "sweetalert2";
import BASE_URL from "../../config";

const UserProfile = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: user.UserProfile.firstName || "",
    lastName: user.UserProfile.lastName || "",
    email: user.email || "",
    nationality: user.UserProfile.nationality || "",
    birthday: user.UserProfile.birthday || "",
    gender: user.UserProfile.gender || "",
    emergencyContactName: user.UserProfile.emergencyContactName || "",
    emergencyContactNumber: user.UserProfile.emergencyContactNumber || "",
    roleId: user.Role.name === "admin" ? 1 : user.Role.name === "doctor" ? 2 : 3, // Default to 'Patient'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const profileResponse = await fetch(
        `${BASE_URL}/authentication/profile/${user.id}`,
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

      const roleResponse = await fetch(
        `${BASE_URL}/authentication/role/${user.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roleId: formData.roleId }),
        }
      );

      if (profileResponse.ok && roleResponse.ok) {
        Swal.fire("Updated!", "User profile updated successfully", "success");
        onClose();
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
            readOnly
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
