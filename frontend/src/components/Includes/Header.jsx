import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

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
    <header className="bg-white shadow-md fixed top-0 w-full z-50 h-19">
      <nav className="container mx-auto flex justify-between items-center py-2 px-16">
        {/* Left: Logo */}
        <div className="ml-10">
          <NavLink to="/" className="text-darkgreen font-semibold font-headers">
            revival
          </NavLink>
        </div>

        {/* Right: Navigation Links */}
        <div className="flex items-center space-x-10">
          <NavLink
            to="/aesthetics-clinic"
            className={({ isActive }) =>
              `text-[#1B2E22] transition-all duration-300 transform ${
                isActive
                  ? "opacity-100 font-semibold translate-y-[-2px]"
                  : "opacity-50 hover:opacity-100 hover:translate-y-[-2px]"
              }`
            }
          >
            Aesthetics Clinic
          </NavLink>
          <NavLink
            to="/virtual-clinic"
            className={({ isActive }) =>
              `text-[#1B2E22] transition-all duration-300 transform ${
                isActive
                  ? "opacity-100 font-semibold translate-y-[-2px]"
                  : "opacity-50 hover:opacity-100 hover:translate-y-[-2px]"
              }`
            }
          >
            Virtual Clinic
          </NavLink>
          <NavLink
            to="/more-information"
            className={({ isActive }) =>
              `text-[#1B2E22] transition-all duration-300 transform ${
                isActive
                  ? "opacity-100 font-semibold translate-y-[-2px]"
                  : "opacity-50 hover:opacity-100 hover:translate-y-[-2px]"
              }`
            }
          >
            More Information
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `text-[#1B2E22] transition-all duration-300 transform ${
                isActive
                  ? "opacity-100 font-semibold translate-y-[-2px]"
                  : "opacity-50 hover:opacity-100 hover:translate-y-[-2px]"
              }`
            }
          >
            Contact Us
          </NavLink>

          {/* Show Dashboard link for logged-in users */}
          {auth.isAuthenticated && (
            <>
              {/* Admin Dashboard */}
              {auth.role === "admin" && (
                <NavLink
                  to="/admin-dashboard"
                  className={({ isActive }) =>
                    `text-[#1B2E22] transition-all duration-300 transform ${
                      isActive
                        ? "opacity-100 font-semibold translate-y-[-2px]"
                        : "opacity-50 hover:opacity-100 hover:translate-y-[-2px]"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
              )}

              {/* Normal User Dashboard */}
              {auth.role === "user" && (
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `text-[#1B2E22] transition-all duration-300 transform ${
                      isActive
                        ? "opacity-100 font-semibold translate-y-[-2px]"
                        : "opacity-50 hover:opacity-100 hover:translate-y-[-2px]"
                    }`
                  }
                >
                  Dashboard
                </NavLink>
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
                      <NavLink
                        to="/doctor-dashboard"
                        className="block px-4 py-2 text-[#1B2E22] hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)} // Close dropdown on click
                      >
                        Doctor Dashboard
                      </NavLink>
                      <NavLink
                        to="/admin-dashboard"
                        className="block px-4 py-2 text-[#1B2E22] hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)} // Close dropdown on click
                      >
                        Admin Dashboard
                      </NavLink>
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
              <NavLink
                to="/login"
                className="px-4 py-2 bg-[#1B2E22] text-[#EDE1D2] hover:bg-[#EDE1D2] hover:text-[#1B2E22] transition-all duration-300"
              >
                Log In
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-2 bg-[#1B2E22] text-[#EDE1D2] hover:bg-[#EDE1D2] hover:text-[#1B2E22] transition-all duration-300"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
