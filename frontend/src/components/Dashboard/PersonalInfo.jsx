import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";

const PersonalInfo = () => {
  // Get user data from AuthContext
  const { auth } = useContext(AuthContext);

  // Default user information from auth
  const [userInfo, setUserInfo] = useState({
    firstName: auth.user.profile.firstName,
    lastName: auth.user.profile.lastName,
    email: auth.user.email,
    nationality: auth.user.profile.nationality,
    birthday: auth.user.profile.birthday.split("T")[0], // Formatting date for input
    gender: auth.user.profile.gender,
    emergencyContactName: auth.user.profile.emergencyContactName,
    emergencyContactNumber: auth.user.profile.emergencyContactNumber,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/profile/${auth.user.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userInfo),
        }
      );
      const data = await response.json();

      if (response.ok) {
        Swal.fire("Success", data.message, "success");
      } else {
        Swal.fire("Error", data.error, "error");
      }
    } catch (error) {
      Swal.fire("Error", "An error occurred while updating.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-headers font-semibold text-darkgreen mb-4">
        Personal Information
      </h2>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            name="firstName"
            value={userInfo.firstName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={userInfo.lastName}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Nationality</label>
          <input
            type="text"
            name="nationality"
            value={userInfo.nationality}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Birthday</label>
          <input
            type="date"
            name="birthday"
            value={userInfo.birthday}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Gender</label>
          <select
            name="gender"
            value={userInfo.gender}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Emergency Contact Name</label>
          <input
            type="text"
            name="emergencyContactName"
            value={userInfo.emergencyContactName || ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">
            Emergency Contact Number
          </label>
          <input
            type="tel"
            name="emergencyContactNumber"
            value={userInfo.emergencyContactNumber || ""}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </form>
      <div className="flex justify-end mt-6">
        <button
          onClick={handleUpdate}
          disabled={isLoading}
          className="bg-darkgreen text-white font-cta px-6 py-2 rounded-lg hover:bg-opacity-80 transition-all duration-300"
        >
          {isLoading ? "Updating..." : "Update Information"}
        </button>
      </div>
    </div>
  );
};

export default PersonalInfo;
