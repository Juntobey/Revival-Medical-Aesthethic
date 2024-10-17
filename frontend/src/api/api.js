// src/api/api.js
import axios from "axios";

const API_URL = "http://localhost:3000"; // Replace with your backend URL

// Login API call
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data; // Backend should return user info and token
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Signup API call
export const signupUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (response.ok) {
      console.log("Registration successful:", result);
      // Handle successful registration, e.g., navigate to login page or show a success message
    } else {
      console.log("Registration failed:", result);
      // Handle errors, e.g., show error messages
    }
  } catch (error) {
    console.error("Error submitting registration:", error);
  }
};
