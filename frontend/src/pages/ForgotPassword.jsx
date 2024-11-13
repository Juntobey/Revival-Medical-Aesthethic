import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    // Simulate an API call for password reset
    try {
      const isSuccess = await fakePasswordResetApiCall(email); // Replace with actual API call

      if (isSuccess) {
        MySwal.fire({
          icon: "success",
          title: "Reset Link Sent",
          text: `Password reset link sent to ${email}.`,
          confirmButtonText: "Go to Login",
        }).then(() => {
          navigate("/login");
        });
      } else {
        MySwal.fire({
          icon: "error",
          title: "Failed to Send Reset Link",
          text: "We couldn't send the reset link to the provided email. Please try again or register a new account.",
          showCancelButton: true,
          confirmButtonText: "Go to Register",
          cancelButtonText: "Try Again",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/register");
          } else {
          }
        });
      }
    } catch (error) {
      console.error("Error sending reset link:", error);
      MySwal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again later.",
      });
    }
  };

  // Simulated API function (replace with actual API call)
  const fakePasswordResetApiCall = (email) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate success for valid emails and failure for invalid
        resolve(email.includes("@"));
      }, 1000);
    });
  };

  return (
    <div className="flex flex-col min-h-screen justify-center items-center">
      <h1 className="text-h2 font-headers font-bold text-red mb-6 font-cormorant">
        Forgot Password
      </h1>
      <form
        className="w-full max-w-md space-y-6"
        onSubmit={handleForgotPassword}
      >
        <div className="mb-4">
          <label className="block text-red mb-2 text-[18px] font-lato">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-red rounded-lg focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#DDC5AD] text-red font-cta font-bold rounded-lg hover:bg-[#b89475] transition duration-300"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
