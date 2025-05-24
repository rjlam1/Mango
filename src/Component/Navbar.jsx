import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../PrivateRouter/AuthPrivate";
import { FiMenu, FiX } from "react-icons/fi";
import { ThemeContext } from "./Theme";
import { MoonIcon, SunIcon } from "lucide-react";
import { FaLeaf } from "react-icons/fa";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isDark = theme === "dark";

  const handleLogOut = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch((err) => console.error(err));
    navigate("/");
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={`p-1 shadow-md transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 mx-auto max-w-9xl md:px-14">
        <NavLink
          to="/"
          className="flex items-center px-4 text-3xl font-bold text-green-600 transition-colors duration-300"
        >
          <FaLeaf className="mr-2" /> PlantCare
        </NavLink>

        <div className="flex items-center md:hidden gap-x-2">
          <button
            onClick={toggleTheme}
            className="p-2 transition cursor-pointer"
          >
            {theme === "dark" ? (
              <SunIcon className="w-6 h-6 text-yellow-400" />
            ) : (
              <MoonIcon className="w-6 h-6 text-gray-800" />
            )}
          </button>
          {user?.photoURL && (
            <img
              src={user.photoURL}
              alt="User"
              className="w-10 h-10 border-2 border-green-600 rounded-full shadow-md"
            />
          )}
          <button onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        <div className="items-center hidden space-x-4 md:flex">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-2 py-1 text-lg font-bold rounded text-green-600 ${
                isActive ? "underline underline-offset-4 decoration-2" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/allPlants"
            className={({ isActive }) =>
              `px-2 py-1 text-lg font-bold rounded text-green-600 ${
                isActive ? "underline underline-offset-4 decoration-2" : ""
              }`
            }
          >
            All Plants
          </NavLink>
          <NavLink
            to="/addPlants"
            className={({ isActive }) =>
              `px-2 py-1 text-lg font-bold rounded text-green-600 ${
                isActive ? "underline underline-offset-4 decoration-2" : ""
              }`
            }
          >
            Add Plant
          </NavLink>
          <NavLink
            to="/myPlants"
            className={({ isActive }) =>
              `px-2 py-1 text-lg font-bold rounded text-green-600 ${
                isActive ? "underline underline-offset-4 decoration-2" : ""
              }`
            }
          >
            My Plants
          </NavLink>

          <button
            onClick={toggleTheme}
            className="p-2 transition cursor-pointer"
          >
            {theme === "dark" ? (
              <SunIcon className="w-6 h-6 text-yellow-400" />
            ) : (
              <MoonIcon className="w-6 h-6 text-gray-800" />
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              {user.photoURL ? (
                <div className="relative group">
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-8 h-8 transition-transform duration-300 transform border-2 border-green-600 rounded-full shadow-md cursor-pointer sm:w-10 sm:h-10 md:w-12 md:h-12 hover:scale-105"
                  />
                  <div className="absolute z-10 hidden group-hover:block right-0 top-full mt-2 bg-white text-black p-3 rounded-lg shadow-xl min-w-[150px]">
                    <span className="block px-3 py-1 mb-2 text-sm text-white bg-green-700 rounded-sm">
                      {user.displayName}
                    </span>
                    <button
                      onClick={handleLogOut}
                      className="w-full px-4 py-1 text-lg font-bold text-white transition-colors duration-300 bg-green-600 rounded-md hover:bg-green-700"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={handleLogOut}
                  className="px-4 py-2 text-lg font-bold text-white transition-colors duration-300 bg-green-600 rounded-md hover:bg-green-700"
                >
                  Logout
                </button>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <NavLink
                to="/login"
                className="px-4 py-2 text-lg font-bold text-white transition-colors duration-300 bg-green-600 rounded-md hover:bg-green-700"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-2 text-lg font-bold text-white transition-colors duration-300 bg-green-600 rounded-md hover:bg-green-700"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>

        {isOpen && (
          <div
            className={`absolute left-0 right-0 z-20 flex flex-col items-center w-full gap-4 p-4 mt-2 shadow-lg md:hidden top-16 transition-colors duration-300 ${
              isDark ? "bg-gray-900 text-white" : "bg-white text-gray-800"
            }`}
          >
            <NavLink
              to="/"
              onClick={toggleMenu}
              className={({ isActive }) =>
                `w-full text-center py-2 text-lg font-bold rounded text-green-600 ${
                  isActive ? "underline underline-offset-4 decoration-2" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/allPlants"
              onClick={toggleMenu}
              className={({ isActive }) =>
                `w-full text-center py-2 text-lg font-bold rounded text-green-600 ${
                  isActive ? "underline underline-offset-4 decoration-2" : ""
                }`
              }
            >
              All Plants
            </NavLink>
            <NavLink
              to="/addPlants"
              onClick={toggleMenu}
              className={({ isActive }) =>
                `w-full text-center py-2 text-lg font-bold rounded text-green-600 ${
                  isActive ? "underline underline-offset-4 decoration-2" : ""
                }`
              }
            >
              Add Plant
            </NavLink>
            <NavLink
              to="/myPlants"
              onClick={toggleMenu}
              className={({ isActive }) =>
                `w-full text-center py-2 text-lg font-bold rounded text-green-600 ${
                  isActive ? "underline underline-offset-4 decoration-2" : ""
                }`
              }
            >
              My Plants
            </NavLink>

            {user ? (
              <div className="flex flex-col items-center w-full gap-2">
                <button
                  onClick={() => {
                    handleLogOut();
                    toggleMenu();
                  }}
                  className="w-full px-4 py-2 text-lg font-bold text-white transition-colors duration-300 bg-green-600 rounded-md hover:bg-green-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col w-full gap-2">
                <NavLink
                  to="/login"
                  onClick={toggleMenu}
                  className="w-full px-4 py-2 text-lg font-bold text-center text-white transition-colors duration-300 bg-green-600 rounded-md hover:bg-green-700"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={toggleMenu}
                  className="w-full px-4 py-2 text-lg font-bold text-center text-white transition-colors duration-300 bg-green-600 rounded-md hover:bg-green-700"
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
