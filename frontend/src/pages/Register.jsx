import React, { useState, useContext } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import { FaGoogle, FaFacebook } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    birthday: {
      day: "",
      month: "",
      year: "",
    },
    nationality: "",
    gender: "",
  });

  const { auth, setAuth } = useContext(AuthContext); // Accessing context

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBirthdayChange = (e) => {
    setFormData({
      ...formData,
      birthday: { ...formData.birthday, [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, confirmPassword, email } = formData;

    if (password === confirmPassword) {
      // Simulate successful registration by updating auth state
      setAuth({
        isAuthenticated: true,
        user: { name: email },
        role: "user", // Default role after registration
      });
      console.log("User registered:", email);
    } else {
      console.log("Passwords do not match!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex">
        {/* Left Section */}
        <div className="flex-grow bg-[#1B2E22] p-8 flex items-center justify-center">
          <h2 className="text-[5rem] text-white font-cormorant leading-tight">
            Natural beauty <br /> protected, <br /> Natural beauty <br />{" "}
            restored.
          </h2>
        </div>

        {/* Right Section - Form */}
        <div className="flex flex-col items-center justify-center w-1/2 py-12 px-16">
          <h2 className="text-4xl font-bold mb-8 text-[#1B2E22]">Register</h2>
          <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
            {/* First Name and Last Name */}
            <div className="flex space-x-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-1/2 border-[#1B2E22] p-3 rounded-lg"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-1/2 border-[#1B2E22] p-3 rounded-lg"
              />
            </div>

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-[#1B2E22] p-3 rounded-lg"
              required
            />

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="New Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border-[#1B2E22] p-3 rounded-lg"
              required
            />

            {/* Birthday */}
            <div className="flex space-x-4">
              <select
                name="month"
                value={formData.birthday.month}
                onChange={handleBirthdayChange}
                className="w-1/3 border-[#1B2E22] p-3 rounded-lg"
              >
                <option value="" disabled>
                  Month
                </option>
                {/* Add more months */}
              </select>
              <select
                name="day"
                value={formData.birthday.day}
                onChange={handleBirthdayChange}
                className="w-1/3 border-[#1B2E22] p-3 rounded-lg"
              >
                <option value="" disabled>
                  Day
                </option>
                {/* Add days */}
              </select>
              <select
                name="year"
                value={formData.birthday.year}
                onChange={handleBirthdayChange}
                className="w-1/3 border-[#1B2E22] p-3 rounded-lg"
              >
                <option value="" disabled>
                  Year
                </option>
                {/* Add years */}
              </select>
            </div>

            {/* Nationality */}
            <input
              type="text"
              name="nationality"
              placeholder="Nationality"
              value={formData.nationality}
              onChange={handleChange}
              className="w-full border-[#1B2E22] p-3 rounded-lg"
            />

            {/* Gender */}
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                  className="mr-2"
                />
                Female
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  onChange={handleChange}
                  className="mr-2"
                />
                Other
              </label>
            </div>

            {/* Confirm Password */}
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border-[#1B2E22] p-3 rounded-lg"
              required
            />

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-[#1B2E22] text-white py-3 rounded-lg"
            >
              Register
            </button>
          </form>

          {/* Social Login Buttons */}
          <div className="flex space-x-4 mt-8">
            <button className="w-full flex items-center justify-center py-3 px-4 border rounded-lg hover:bg-opacity-80 transition-all duration-300">
              <FaGoogle className="mr-2" />
              Register with Google
            </button>
            <button className="w-full flex items-center justify-center py-3 px-4 border rounded-lg hover:bg-opacity-80 transition-all duration-300">
              <FaFacebook className="mr-2" />
              Register with Facebook
            </button>
          </div>
        </div>
      </div>
      <Footer /> {/* Include the footer */}
    </div>
  );
};

export default Register;
