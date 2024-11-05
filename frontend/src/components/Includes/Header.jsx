// src/components/Includes/Header.jsx
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Header = () => {
  const { auth, signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLogout = () => {
    MySwal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "No, stay logged in",
      customClass: {
        popup: "bg-luxwhite text-darkgreen",
        title: "text-3xl font-bold font-headers text-grey-600",
        confirmButton:
          "hover:bg-red-700 text-luxwhite font-cta py-2 px-4 rounded",
        cancelButton:
          "hover:bg-gray-400 text-luxwhite font-cta py-2 px-4 rounded",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        signOut();
        navigate("/");
      }
    });
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-white shadow-md fixed top-0 w-full z-50 h-19.5">
      <nav className="container mx-auto flex justify-between items-center py-3 px-16">
        <div className="ml-10">
          <NavLink
            to="/"
            className="text-darkgreen font-semibold font-headers text-[28px]"
            onClick={scrollToTop}
          >
            revival
          </NavLink>
        </div>

        <div className="flex items-center space-x-10">
          {/* General Links */}
          <NavLink
            to="/aesthetics-clinic"
            className={({ isActive }) =>
              `text-[#1B2E22] transition-all duration-300 transform ${
                isActive
                  ? "opacity-100 font-semibold translate-y-[-2px]"
                  : "opacity-50 hover:opacity-100 hover:translate-y-[-2px]"
              }`
            }
            onClick={scrollToTop}
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
            onClick={scrollToTop}
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
            onClick={scrollToTop}
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
            onClick={scrollToTop}
          >
            Contact Us
          </NavLink>

          {/* Dashboard Links for Logged-in Users */}
          {auth.isAuthenticated && (
            <>
              {auth.user.role === "admin" && (
                <NavLink
                  to="/admin-dashboard"
                  className={({ isActive }) =>
                    `text-[#1B2E22] transition-all duration-300 transform ${
                      isActive
                        ? "opacity-100 font-semibold translate-y-[-2px]"
                        : "opacity-50 hover:opacity-100 hover:translate-y-[-2px]"
                    }`
                  }
                  onClick={scrollToTop}
                >
                  Admin Dashboard
                </NavLink>
              )}

              {auth.user.role === "doctor" && (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="text-[#1B2E22] opacity-50 hover:opacity-100 transition-opacity duration-300"
                  >
                    Dashboards <span className="ml-1">▼</span>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                      <NavLink
                        to="/doctor-dashboard"
                        className="block px-4 py-2 text-[#1B2E22] hover:bg-gray-100"
                        onClick={() => {
                          setDropdownOpen(false);
                          scrollToTop();
                        }}
                      >
                        Doctor's Dashboard
                      </NavLink>
                      <NavLink
                        to="/admin-dashboard"
                        className="block px-4 py-2 text-[#1B2E22] hover:bg-gray-100"
                        onClick={() => {
                          setDropdownOpen(false);
                          scrollToTop();
                        }}
                      >
                        Admin Dashboard
                      </NavLink>
                    </div>
                  )}
                </div>
              )}
            </>
          )}

          {/* Authentication Links */}
          {auth.isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-[#1B2E22] text-[#EDE1D2] hover:bg-[#EDE1D2] hover:text-[#1B2E22] transition-all duration-300"
            >
              Log Out
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className="px-4 py-2 bg-[#1B2E22] text-[#EDE1D2] hover:bg-[#EDE1D2] hover:text-[#1B2E22] transition-all duration-300"
                onClick={scrollToTop}
              >
                Log In
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-2 bg-[#1B2E22] text-[#EDE1D2] hover:bg-[#EDE1D2] hover:text-[#1B2E22] transition-all duration-300"
                onClick={scrollToTop}
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
