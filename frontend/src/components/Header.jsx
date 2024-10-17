import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { auth, signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown

  const handleLogout = () => {
    signOut();
    navigate("/"); // Redirect to home page after logging out
  };

  // Function to toggle the dropdown menu
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50">
      <nav className="container mx-auto flex justify-between items-center py-4 px-16">
        {/* Left: Logo */}
        <div className="ml-10">
          <Link to="/">
            <img
              src={`${process.env.PUBLIC_URL}/Dark Green - Transparent.png`} // Update this with the actual logo path
              alt="Revival Aesthetics"
              className="w-12 h-auto"
            />
          </Link>
        </div>

        {/* Right: Navigation Links */}
        <div className="flex items-center space-x-10">
          <Link
            to="/aesthetics-clinic"
            className="text-[#1B2E22] opacity-50 hover:opacity-100 transition-opacity duration-300"
          >
            Aesthetics Clinic
          </Link>
          <Link
            to="/virtual-clinic"
            className="text-[#1B2E22] opacity-50 hover:opacity-100 transition-opacity duration-300"
          >
            Virtual Clinic
          </Link>
          <Link
            to="/more-information"
            className="text-[#1B2E22] opacity-50 hover:opacity-100 transition-opacity duration-300"
          >
            More Information
          </Link>
          <Link
            to="/contact"
            className="text-[#1B2E22] opacity-50 hover:opacity-100 transition-opacity duration-300"
          >
            Contact Us
          </Link>

          {/* Show Dashboard link for logged-in users */}
          {auth.isAuthenticated && (
            <>
              {/* Admin Dashboard */}
              {auth.role === "admin" && (
                <Link
                  to="/admin-dashboard"
                  className="text-[#1B2E22] opacity-50 hover:opacity-100 transition-opacity duration-300"
                >
                  Dashboard
                </Link>
              )}

              {/* Normal User Dashboard */}
              {auth.role === "user" && (
                <Link
                  to="/dashboard"
                  className="text-[#1B2E22] opacity-50 hover:opacity-100 transition-opacity duration-300"
                >
                  Dashboard
                </Link>
              )}

              {/* Doctor Dashboard with Dropdown */}
              {auth.role === "doctor" && (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="text-[#1B2E22] opacity-50 hover:opacity-100 transition-opacity duration-300"
                  >
                    Dashboards <span className="ml-1">▼</span>
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                      <Link
                        to="/doctor-dashboard"
                        className="block px-4 py-2 text-[#1B2E22] hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)} // Close dropdown on click
                      >
                        Doctor Dashboard
                      </Link>
                      <Link
                        to="/admin-dashboard"
                        className="block px-4 py-2 text-[#1B2E22] hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)} // Close dropdown on click
                      >
                        Admin Dashboard
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-[#1B2E22] text-[#EDE1D2] hover:bg-[#EDE1D2] hover:text-[#1B2E22] transition-all duration-300"
              >
                Log Out
              </button>
            </>
          )}

          {/* Show Log In and Register buttons for logged-out users */}
          {!auth.isAuthenticated && (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-[#1B2E22] text-[#EDE1D2] hover:bg-[#EDE1D2] hover:text-[#1B2E22] transition-all duration-300"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-[#1B2E22] text-[#EDE1D2] hover:bg-[#EDE1D2] hover:text-[#1B2E22] transition-all duration-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
