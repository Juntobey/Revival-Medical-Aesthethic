import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import Footer from "../components/Footer"; // Import Footer
import Header from "../components/Header"; // Import Header
import { FaGoogle, FaFacebook } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const formData = { email, password };

      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log(response) // @tafara you can see the data returned from the backend after success login ,this is where 
        // you can see data such as response.data.role then if admin navigate to admin dashboard etc
        localStorage.setItem("token", result.token); // Store the token
        navigate("/dashboard"); // Redirect to the dashboard or desired route
      } else {
        setError(result.error || "Login failed, please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Login failed, please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex">
        {/* Left Section */}
        <div className="flex-grow bg-[#C2A892] p-8 flex items-center justify-center">
          <h2 className="text-[5rem] text-white font-cormorant leading-tight">
            Natural beauty <br /> protected, <br /> Natural beauty <br />{" "}
            restored.
          </h2>
        </div>

        {/* Right Section - Form */}
        <div className="flex flex-col items-center justify-center w-1/2 py-12 px-16">
          <h2 className="text-4xl font-bold mb-8 text-[#7A5547] font-cormorant">
            Login
          </h2>
          <form className="w-full max-w-md space-y-6" onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-[#7A5547] border-opacity-60 p-3 rounded-lg focus:border-opacity-100 focus:ring-[#7A5547] transition-opacity duration-300"
                style={{ borderColor: "rgba(122, 85, 71, 0.5)" }}
              />
            </div>

            {/* Password Field */}
            <div className="relative input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-[#7A5547] border-opacity-60 p-3 rounded-lg focus:border-opacity-100 focus:ring-[#7A5547] transition-opacity duration-300"
                style={{ borderColor: "rgba(122, 85, 71, 0.5)" }}
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#7A5547] opacity-70"
              >
                {showPassword ? "👁️" : "🙈"}
              </span>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#E9DCD1] text-[#7A5547] py-3 rounded-lg hover:bg-opacity-80 active:bg-opacity-60 transition-all duration-300"
            >
              Log In
            </button>
          </form>

          {/* Links */}
          <div className="flex justify-between w-full max-w-md mt-4">
            <a href="/register" className="text-[#7A5547] hover:underline">
              Don’t have an account?
            </a>
            <a
              href="/forgot-password"
              className="text-[#7A5547] hover:underline"
            >
              Forgot password?
            </a>
          </div>

          {/* Divider */}
          <div className="flex items-center w-full max-w-md my-6">
            <hr className="flex-grow border-t border-[#7A5547] opacity-50" />
            <span className="px-2 text-[#7A5547]">Or</span>
            <hr className="flex-grow border-t border-[#7A5547] opacity-50" />
          </div>

          {/* Social Login Buttons */}
          <div className="flex space-x-4 w-full max-w-md">
            <button className="flex items-center justify-center py-3 px-4 border rounded-lg w-1/2 text-[#DB4437] border-[#DB4437] hover:bg-opacity-80 transition-all duration-300">
              <FaGoogle className="mr-2" />
              Log In with Google
            </button>
            <button className="flex items-center justify-center py-3 px-4 border rounded-lg w-1/2 text-[#1877F2] border-[#1877F2] hover:bg-opacity-80 transition-all duration-300">
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

export default Login;
