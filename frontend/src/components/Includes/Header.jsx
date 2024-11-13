import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Header = () => {
  const { auth, signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

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
      confirmButtonColor: "#470A12",
      cancelButtonColor: "#1B2E22",
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
        navigate("/aesthetics-clinic");
      }
    });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-luxwhite shadow-md fixed top-0 w-full z-50">
      <nav className="container mx-auto flex justify-between items-center py-3 px-6 lg:px-16">
        <div>
          <NavLink
            to="/"
            className="text-darkgreen font-semibold font-headers text-[28px]"
            onClick={scrollToTop}
          >
            revival
          </NavLink>
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-10">
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

          {/* Role-Specific Dashboard Links */}
          {auth.isAuthenticated && (
            <>
              {auth.user.role === "admin" && (
                <NavLink
                  to="/admin-dashboard"
                  className="text-[#1B2E22] opacity-50 hover:opacity-100 transition-opacity duration-300"
                  onClick={scrollToTop}
                >
                  Admin Dashboard
                </NavLink>
              )}
              {auth.user.role === "doctor" && (
                <NavLink
                  to="/doctor-dashboard"
                  className="text-[#1B2E22] opacity-50 hover:opacity-100 transition-opacity duration-300"
                  onClick={scrollToTop}
                >
                  Doctor's Dashboard
                </NavLink>
              )}
              {auth.user.role === "user" && (
                <NavLink
                  to="/dashboard"
                  className="text-[#1B2E22] opacity-50 hover:opacity-100 transition-opacity duration-300"
                  onClick={scrollToTop}
                >
                  Dashboard
                </NavLink>
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

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-darkgreen focus:outline-none"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-luxwhite shadow-md fixed w-full z-50">
          <div className="flex flex-col space-y-4 px-6 py-4">
            <NavLink
              to="/aesthetics-clinic"
              className="text-[#1B2E22] transition-all duration-300 transform"
              onClick={() => {
                toggleMenu();
                scrollToTop();
              }}
            >
              Aesthetics Clinic
            </NavLink>
            <NavLink
              to="/virtual-clinic"
              className="text-[#1B2E22] transition-all duration-300 transform"
              onClick={() => {
                toggleMenu();
                scrollToTop();
              }}
            >
              Virtual Clinic
            </NavLink>
            <NavLink
              to="/more-information"
              className="text-[#1B2E22] transition-all duration-300 transform"
              onClick={() => {
                toggleMenu();
                scrollToTop();
              }}
            >
              More Information
            </NavLink>
            <NavLink
              to="/contact"
              className="text-[#1B2E22] transition-all duration-300 transform"
              onClick={() => {
                toggleMenu();
                scrollToTop();
              }}
            >
              Contact Us
            </NavLink>

            {/* Role-Specific Dashboard Links */}
            {auth.isAuthenticated && (
              <>
                {auth.user.role === "admin" && (
                  <NavLink
                    to="/admin-dashboard"
                    className="text-[#1B2E22] transition-all duration-300 transform"
                    onClick={() => {
                      toggleMenu();
                      scrollToTop();
                    }}
                  >
                    Admin Dashboard
                  </NavLink>
                )}
                {auth.user.role === "doctor" && (
                  <NavLink
                    to="/doctor-dashboard"
                    className="text-[#1B2E22] transition-all duration-300 transform"
                    onClick={() => {
                      toggleMenu();
                      scrollToTop();
                    }}
                  >
                    Doctor's Dashboard
                  </NavLink>
                )}
                {auth.user.role === "user" && (
                  <NavLink
                    to="/dashboard"
                    className="text-[#1B2E22] transition-all duration-300 transform"
                    onClick={() => {
                      toggleMenu();
                      scrollToTop();
                    }}
                  >
                    Dashboard
                  </NavLink>
                )}
              </>
            )}

            {/* Authentication Links */}
            {auth.isAuthenticated ? (
              <button
                onClick={() => {
                  toggleMenu();
                  handleLogout();
                }}
                className="px-4 py-2 bg-[#1B2E22] text-[#EDE1D2] hover:bg-[#EDE1D2] hover:text-[#1B2E22] transition-all duration-300"
              >
                Log Out
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="px-4 py-2 bg-[#1B2E22] text-[#EDE1D2] hover:bg-[#EDE1D2] hover:text-[#1B2E22] transition-all duration-300"
                  onClick={() => {
                    toggleMenu();
                    scrollToTop();
                  }}
                >
                  Log In
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-2 bg-[#1B2E22] text-[#EDE1D2] hover:bg-[#EDE1D2] hover:text-[#1B2E22] transition-all duration-300"
                  onClick={() => {
                    toggleMenu();
                    scrollToTop();
                  }}
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
