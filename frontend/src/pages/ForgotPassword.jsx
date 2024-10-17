// src/pages/ForgotPassword.jsx
import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Add logic to handle password reset email sending
    alert(`Password reset link sent to ${email}`);
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <h1 className="text-[48px] font-bold text-[#7A3E29] mb-6 font-cormorant">
        Forgot Password
      </h1>
      <form
        className="w-full max-w-md space-y-6"
        onSubmit={handleForgotPassword}
      >
        <div className="mb-4">
          <label className="block text-[#7A3E29] mb-2 text-[18px] font-lato">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-[#7A3E29] rounded-lg focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#DDC5AD] text-[#7A3E29] font-bold rounded-lg hover:bg-[#b89475] transition duration-300"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
