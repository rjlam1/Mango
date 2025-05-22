import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../PrivateRouter/AuthPrivate";
import { FiMenu, FiX } from "react-icons/fi";
import { ThemeContext } from "./Theme";
import { MoonIcon, SunIcon } from "lucide-react";
import { FaLeaf } from 'react-icons/fa';
const Navbar = () => {
  const { theme,toggleTheme } = useContext(ThemeContext);
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
      className={` p-1 shadow-md transition-colors duration-300 ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}

    >
      <div className="flex items-center justify-between px-10 py-3 mx-auto max-w-9xl md:px-14">
      <NavLink to="/" className="flex items-center px-4 text-3xl font-bold text-green-600 transition-colors duration-300 ">
  <FaLeaf className="mr-2" /> PlantCare
</NavLink>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Menu Links */}
        <div
          className={`md:flex items-center space-x-4 ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-2 py-1 text-xl font-bold rounded text-green-600 ${
                isActive ? " underline underline-offset-4 decoration-2" : ""
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/allPlants"
            className={({ isActive }) =>
              `block px-2 py-1 text-xl font-bold rounded text-green-600 ${
                isActive ? " underline underline-offset-4 decoration-2" : ""
              }`
            }
          >
            All Plants
          </NavLink>
          <NavLink
            to="/addPlants"
            className={({ isActive }) =>
              `block px-2 py-1 text-xl font-bold rounded text-green-600 ${
                isActive ? " underline underline-offset-4 decoration-2" : ""
              }`
            }
          >
            Add Plant
          </NavLink>
          <NavLink
            to="/myPlants"
            className={({ isActive }) =>
              `block px-2 py-1 text-xl font-bold rounded text-green-600 ${
                isActive ? " underline underline-offset-4 decoration-2" : ""
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
            <>
              {/* Avatar with tooltip */}
              {user.photoURL && (
                <div className="relative group">
                  <img
                    src={user?.photoURL}
                    alt="User"
                    className="w-10 h-10 transition-transform duration-300 transform border-2 border-green-600 rounded-full shadow-md cursor-pointer "
                  />
                  <div className="absolute z-10 hidden group-hover:flex flex-col items-center bg-white text-black p-3 rounded-lg shadow-xl -right-3/9 translate-x-1/4 top-full mt- 4min-w-[100px]">
                    <span className="px-3 py-1 mb-1 text-sm text-white transition-colors duration-300 bg-green-700 rounded-sm cursor-pointer">
                      {user.displayName}
                    </span>
                    <button
                      onClick={handleLogOut}
                      className="px-4 py-1 text-lg font-bold text-white transition-colors duration-300 bg-green-600 rounded-md cursor-pointer"
                    >
                      LogOut
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="block px-2 py-1 text-xl font-bold bg-green-700 rounded hover:bg-green-800"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="block px-2 py-1 text-xl font-bold bg-green-700 rounded hover:bg-green-800"
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
