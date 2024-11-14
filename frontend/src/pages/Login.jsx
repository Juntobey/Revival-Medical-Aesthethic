import React, { useState, useContext } from "react";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Footer from "../components/Includes/Footer";
import Header from "../components/Includes/Header";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isSuccessful = await signIn(email, password);

    if (isSuccessful.success) {
      let timerInterval;

      MySwal.fire({
        title: "Login Successful!",
        html: "Redirecting in <strong>3</strong> seconds.",
        timer: 3000,
        timerProgressBar: true,
        customClass: {
          popup: "bg-luxwhite text-darkgreen",
          title: "text-3xl font-bold font-headers text-grey-600",
          confirmButton:
            "bg-darkgreen font-cta text-luxwhite px-6 py-3 rounded-lg hover:bg-opacity-80 inline-block transition-all duration-300",
        },
        didOpen: () => {
          const b = MySwal.getHtmlContainer().querySelector("strong");
          let remainingTime = 3;
          const timerInterval = setInterval(() => {
            remainingTime -= 1;
            b.textContent = remainingTime;
          }, 1000);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }

        if (isSuccessful.role === "admin") {
          navigate("/admin-dashboard");
        } else if (isSuccessful.role === "doctor") {
          navigate("/doctor-dashboard");
        } else {
          navigate("/dashboard");
        }
      });
    } else {
      // Handle login failure (show an error message)
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: error || "Login failed, please try again.",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow flex">
        {/* Left section with text (hidden on small screens) */}
        <div className="hidden md:flex md:flex-grow bg-lightbrown p-8 items-center justify-center">
          <h2 className="text-h1 text-luxwhite font-headers leading-tight">
            Natural beauty <br /> protected, <br /> Natural beauty <br />{" "}
            restored.
          </h2>
        </div>

        {/* Right section with login form (full width on small screens) */}
        <div className="flex flex-col items-center justify-center w-full md:w-1/2 pb-12 pt-[50px] px-6 md:px-16">
          <h2 className="text-h2 font-headers mb-8 text-[#7A5547] font-cormorant">
            Login
          </h2>
          <form className="w-full max-w-md space-y-6" onSubmit={handleSubmit}>
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b-2 border-[#7A5547] border-opacity-50 p-3 focus:outline-none focus:border-b-3 transition-all duration-300"
              />
            </div>
            <div className="relative input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b-2 border-[#7A5547] border-opacity-50 p-3 focus:outline-none focus:border-b-3 transition-all duration-300"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-[#7A5547] opacity-70"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full font-cta font-semibold bg-[#E9DCD1] text-[#7A5547] py-3 rounded-lg hover:bg-opacity-80 active:bg-opacity-60 transition-all duration-300"
            >
              Log In
            </button>
          </form>
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
          <div className="flex items-center w-full max-w-md my-6">
            <hr className="flex-grow border-t border-[#7A5547] opacity-50" />
            <span className="px-2 text-[#7A5547]">Or</span>
            <hr className="flex-grow border-t border-[#7A5547] opacity-50" />
          </div>
          <div className="flex space-x-4 w-full max-w-md">
            <button className="flex items-center justify-center py-3 px-4 border rounded-lg w-1/2 text-[#DB4437] border-[#DB4437] hover:bg-[#DB4437] hover:text-luxwhite hover:bg-opacity-80 transition-all duration-300">
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

export default Login;
