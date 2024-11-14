import React, { useState, useContext } from "react";
import Header from "../components/Includes/Header";
import Footer from "../components/Includes/Footer";
import { AuthContext } from "../context/AuthContext";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config";

const MySwal = withReactContent(Swal);

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
    gender: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    passportOrId: "",
    medicalAid: {
      name: "",
      scheme: "",
      number: "",
    },
  });

  const { setAuth } = useContext(AuthContext);
  const [passwordError, setPasswordError] = useState("");
  const [passwordStrengthMessage, setPasswordStrengthMessage] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false); // New state for terms acceptance
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordStrengthMessage(
        "Password must be at least 6 characters long."
      );
      setPasswordError("Password too short.");
    } else if (!/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) {
      setPasswordStrengthMessage(
        "Password must contain at least one uppercase letter, one number, and one special character."
      );
      setPasswordError("Weak password.");
    } else {
      setPasswordStrengthMessage("Strong password.");
      setPasswordError("");
    }
  };

  const checkPasswordMatch = (confirmPassword, password) => {
    if (confirmPassword !== password) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "password") {
      validatePassword(e.target.value);
    }
    if (e.target.name === "confirmPassword") {
      checkPasswordMatch(e.target.value, formData.password);
    }
  };

  const handleBirthdayChange = (e) => {
    setFormData({
      ...formData,
      birthday: { ...formData.birthday, [e.target.name]: e.target.value },
    });
  };

  const handleMedicalAidChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      medicalAid: { ...formData.medicalAid, [name]: value },
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const missingFields = [];

    if (!formData.firstName) missingFields.push("First Name");
    if (!formData.lastName) missingFields.push("Last Name");
    if (!formData.email) missingFields.push("Email");
    if (!formData.password) missingFields.push("Password");
    if (!formData.confirmPassword) missingFields.push("Confirm Password");
    if (!formData.birthday.day) missingFields.push("Birthday Day");
    if (!formData.birthday.month) missingFields.push("Birthday Month");
    if (!formData.birthday.year) missingFields.push("Birthday Year");
    if (!formData.gender) missingFields.push("Gender");
    if (!formData.emergencyContactName)
      missingFields.push("Emergency Contact Name");
    if (!formData.emergencyContactNumber)
      missingFields.push("Emergency Contact Number");
    if (!formData.passportOrIdType) missingFields.push("Passport/ID Type");
    if (!formData.passportOrIdNumber) missingFields.push("Passport/ID Number");

    if (missingFields.length > 0) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: `Please fill in the following required fields: ${missingFields.join(
          ", "
        )}`,
        customClass: {
          popup: "bg-gray-100 text-gray-800",
          title: "text-lg font-bold text-red-500",
          confirmButton:
            "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
        },
      });
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/authentication/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          birthday: `${formData.birthday.year}-${formData.birthday.month}-${formData.birthday.day}`,
          gender: formData.gender,
          emergencyContactName: formData.emergencyContactName,
          emergencyContactNumber: formData.emergencyContactNumber,
          passportOrId: {
            type: formData.passportOrIdType,
            number: formData.passportOrIdNumber,
          },
          medicalAid: {
            name: formData.medicalAid.name || null,
            scheme: formData.medicalAid.scheme || null,
            number: formData.medicalAid.number || null,
          },
        }),
      });

      const result = await response.json();
      if (response.ok) {
        MySwal.fire({
          icon: "success",
          title: "Registration Successful!",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            popup: "bg-gray-100 text-gray-800",
            title: "text-lg font-bold text-green-500",
          },
        }).then(() => {
          navigate("/login");
        });
      } else {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: result.error || "Registration failed, please try again.",
          customClass: {
            popup: "bg-gray-100 text-gray-800",
            title: "text-lg font-bold text-red-500",
            confirmButton:
              "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
          },
        });
      }
    } catch (error) {
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Registration failed, please try again.",
        customClass: {
          popup: "bg-gray-100 text-gray-800",
          title: "text-lg font-bold text-red-500",
          confirmButton:
            "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded",
        },
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen pt-15">
      <Header />
      <div className="flex-grow flex">
        <div className="hidden md:flex md:flex-grow bg-[#1B2E22] p-8 items-center justify-center">
          <h2 className="text-h1 text-luxwhite font-headers leading-tight">
            Natural beauty <br /> protected, <br /> Natural beauty <br />{" "}
            restored.
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center w-full md:w-1/2 pt-[120px] px-6 md:px-16 pb-[50px]">
          <h2 className="text-h1 font-headers mb-8 text-darkgreen">Register</h2>
          <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
            {/* First Name and Last Name */}
            <div className="flex space-x-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-1/2 border-b-2 border-darkgreen border-opacity-50 p-3 focus:outline-none focus:border-b-3 transition-all duration-300"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-1/2 border-b-2 border-darkgreen border-opacity-50 p-3 focus:outline-none focus:border-b-3 transition-all duration-300"
                required
              />
            </div>

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border-b-2 border-darkgreen border-opacity-50 p-3 focus:outline-none focus:border-b-3 transition-all duration-300"
              required
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="New Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border-b-2 border-darkgreen border-opacity-50 p-3 focus:outline-none focus:border-b-3 transition-all duration-300"
                required
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 cursor-pointer text-darkgreen opacity-70"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
              <p className="text-sm text-gray-600 mt-1">
                {passwordStrengthMessage}
              </p>
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border-b-2 border-darkgreen border-opacity-50 p-3 focus:outline-none focus:border-b-3 transition-all duration-300"
                required
              />
              <span
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-3 top-3 cursor-pointer text-darkgreen opacity-70"
              >
                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
              {!passwordsMatch && (
                <p className="text-red-500 text-sm mt-1">
                  Passwords do not match!
                </p>
              )}
            </div>

            {/* Birthday */}
            <label className="block text-sm text-gray-700 mt-4 mb-1">
              Birthday
            </label>
            <div className="flex space-x-4">
              <select
                name="month"
                value={formData.birthday.month}
                onChange={handleBirthdayChange}
                className="w-1/3 border-[#1B2E22] p-3 rounded-lg"
                required
              >
                <option value="" disabled>
                  Month
                </option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                name="day"
                value={formData.birthday.day}
                onChange={handleBirthdayChange}
                className="w-1/3 border-[#1B2E22] p-3 rounded-lg"
                required
              >
                <option value="" disabled>
                  Day
                </option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
              <select
                name="year"
                value={formData.birthday.year}
                onChange={handleBirthdayChange}
                className="w-1/3 border-[#1B2E22] p-3 rounded-lg"
                required
              >
                <option value="" disabled>
                  Year
                </option>
                {Array.from({ length: 100 }, (_, i) => (
                  <option key={i} value={new Date().getFullYear() - i}>
                    {new Date().getFullYear() - i}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender */}
            <label className="block text-sm text-gray-700 mt-4 mb-1">
              Gender
            </label>
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

            {/* Passport or ID Selection */}
            <div className="flex space-x-4 items-center">
              <select
                name="passportOrIdType"
                value={formData.passportOrIdType}
                onChange={handleChange}
                className="w-1/4 border-b-2 border-darkgreen border-opacity-50 p-3 focus:outline-none focus:border-b-3 transition-all duration-300"
                required
              >
                <option value="" disabled>
                  Select ID Type
                </option>
                <option value="Passport">Passport</option>
                <option value="ID Number">ID Number</option>
              </select>

              {/* ID Number Input */}
              <input
                type="text"
                name="passportOrIdNumber"
                placeholder={
                  formData.passportOrIdType === "Passport"
                    ? "Enter Passport Number"
                    : "Enter ID Number"
                }
                value={formData.passportOrIdNumber}
                onChange={handleChange}
                className="w-3/4 border-b-2 border-darkgreen border-opacity-50 p-3 focus:outline-none focus:border-b-3 transition-all duration-300"
                required
              />
            </div>

            {/* Emergency Contact */}
            <input
              type="text"
              name="emergencyContactName"
              placeholder="Emergency Contact Name"
              value={formData.emergencyContactName}
              onChange={handleChange}
              className="w-full border-b-2 border-darkgreen border-opacity-50 p-3 focus:outline-none focus:border-b-3 transition-all duration-300"
              required
            />
            <input
              type="tel"
              name="emergencyContactNumber"
              placeholder="Emergency Contact Number"
              value={formData.emergencyContactNumber}
              onChange={handleChange}
              className="w-full border-b-2 border-darkgreen border-opacity-50 p-3 focus:outline-none focus:border-b-3 transition-all duration-300"
              required
            />

            {/* Optional Medical Aid Section */}
            <h3 className="text-md font-semibold text-darkgreen pt-[15px]">
              Medical Aid Information (Optional)
            </h3>
            <input
              type="text"
              name="name"
              placeholder="Medical Aid Name"
              value={formData.medicalAid.name}
              onChange={handleMedicalAidChange}
              className="w-full border-b-2 border-darkgreen border-opacity-50 p-3 focus:outline-none focus:border-b-3 transition-all duration-300"
            />
            <input
              type="text"
              name="scheme"
              placeholder="Scheme Name"
              value={formData.medicalAid.scheme}
              onChange={handleMedicalAidChange}
              className="w-full border-b-2 border-darkgreen border-opacity-50 p-3 focus:outline-none focus:border-b-3 transition-all duration-300"
            />
            <input
              type="text"
              name="number"
              placeholder="Medical Aid Number"
              value={formData.medicalAid.number}
              onChange={handleMedicalAidChange}
              className="w-full border-b-2 border-darkgreen border-opacity-50 p-3 focus:outline-none focus:border-b-3 transition-all duration-300"
            />

            {/* Terms and Conditions */}
            <div className="flex items-center text-center">
              <input
                type="checkbox"
                id="acceptTerms"
                checked={acceptedTerms}
                onChange={() => setAcceptedTerms(!acceptedTerms)}
                className="mr-2"
              />
              <label htmlFor="acceptTerms" className="text-sm text-gray-700">
                By clicking Register, you agree to our{" "}
                <a href="/terms" className="underline">
                  Terms
                </a>
                ,{" "}
                <a href="/data-policy" className="underline">
                  Data Policy
                </a>{" "}
                and how we use cookies and similar technology in our{" "}
                <a href="/cookies-policy" className="underline">
                  Cookies Policy
                </a>
                .
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-darkgreen font-cta text-luxwhite py-3 rounded-lg"
            >
              Register
            </button>
          </form>

          {/* Social Login Buttons */}
          <div className="flex space-x-4 w-full max-w-md pt-[20px]">
            <button className="flex items-center justify-center py-3 px-4 border rounded-lg w-1/2 text-[#DB4437] border-[#DB4437] hover:bg-opacity-80 hover:bg-[#DB4437] hover:text-luxwhite transition-all duration-300">
              <FaGoogle className="mr-2" />
              Log In with Google
            </button>
            <button className="flex items-center justify-center py-3 px-4 border rounded-lg w-1/2 text-[#1877F2] border-[#1877F2] hover:bg-opacity-80 hover:bg-[#1877F2] hover:text-luxwhite transition-all duration-300">
              <FaFacebook className="mr-2" />
              Log In with Facebook
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
