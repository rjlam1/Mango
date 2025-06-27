import React, { useState, useContext } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../../PrivateRouter/AuthPrivate";
import {
  FiHome,
  FiBox,
  FiPlusSquare,
  FiUser,
  FiMenu,
  FiX,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import { ThemeContext } from "../Theme";

const DashboardLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logOut } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const navItems = [
    { path: "/dashboard", icon: <FiHome />, label: "Overview", name: "overview" },
    { path: "/dashboard/all-items", icon: <FiBox />, label: "All Items", name: "all-items" },
    { path: "/dashboard/my-items", icon: <FiUser />, label: "My Items", name: "my-items" },
    { path: "/dashboard/add-item", icon: <FiPlusSquare />, label: "Add Item", name: "add-item" },
  ];

  const themeConfig = {
    dark: {
      bg: "bg-gray-900",
      text: "text-white",
      sidebar: "bg-gray-800",
      content: "bg-gray-800",
      card: "bg-gray-900",
      navHover: "hover:bg-gray-700",
      navActive: "bg-gray-700 text-white",
      button: "bg-gray-700 hover:bg-gray-600",
      logout: "text-red-400 hover:bg-red-800",
    },
    light: {
      bg: "bg-gray-50",
      text: "text-gray-900",
      sidebar: "bg-white",
      content: "bg-gray-100",
      card: "bg-white",
      navHover: "hover:bg-blue-100",
      navActive: "bg-blue-200 text-blue-700",
      button: "bg-blue-500 hover:bg-blue-600",
      logout: "text-red-600 hover:bg-red-100",
    },
  };

  const currentTheme = themeConfig[theme];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${currentTheme.bg} ${currentTheme.text}`}>
      <div className="flex flex-col lg:flex-row">
        {/* Mobile Header */}
        <header className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden dark:border-gray-700">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-md ${theme === "dark" ? "bg-gray-700" : "bg-gray-100"}`}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          {/* <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${currentTheme.button}`}
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>
            {user && (
              <button
                onClick={logOut}
                className={`px-3 py-1 rounded-md text-sm ${currentTheme.logout}`}
              >
                Logout
              </button>
            )}
          </div> */}
        </header>

        {/* Sidebar - Mobile & Desktop */}
        <aside
          className={`
            fixed lg:static z-40 w-64 h-full lg:h-auto
            transform transition-transform duration-300 ease-in-out
            ${currentTheme.sidebar} shadow-lg lg:shadow-none
            ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} 
            lg:translate-x-0
          `}
        >
          <div className="flex flex-col h-full p-4 lg:p-6">
            {/* User Profile */}
            <div className="flex items-center mb-6 space-x-3 lg:mb-8 lg:space-x-4">
              <div className="flex items-center justify-center w-10 h-10 overflow-hidden bg-blue-100 rounded-full lg:w-12 lg:h-12">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="object-cover w-full h-full rounded-full"
                  />
                ) : (
                  <FiUser className="text-blue-600" size={20} />
                )}
              </div>
              <div>
                <p className="text-sm font-semibold lg:text-base">
                  {user?.displayName || user?.email || "Guest User"}
                </p>
                <p className="text-xs text-gray-500 lg:text-sm dark:text-gray-300">
                  {user?.email ? "Logged In" : "Guest"}
                </p>
              </div>
            </div>

            
            <nav className="flex flex-col flex-1 space-y-1 lg:space-y-2">
              {navItems.map(({ path, icon, label, name }) => (
                <Link
                  key={name}
                  to={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-3 py-2 lg:px-4 lg:py-3 rounded-lg transition-colors text-sm lg:text-base
                    ${currentTheme.navHover}
                    ${location.pathname === path ? currentTheme.navActive : ""}
                  `}
                >
                  <span className="mr-2 lg:mr-3">{icon}</span>
                  {label}
                </Link>
              ))}
            </nav>

         
            <div className="hidden lg:block">
              {/* <button
                onClick={toggleTheme}
                className={`flex items-center justify-center w-full px-4 py-2 mt-6 text-sm font-medium text-white rounded-lg ${currentTheme.button}`}
              >
                {theme === "dark" ? <FiSun className="mr-2" /> : <FiMoon className="mr-2" />}
                {theme === "dark" ? "Light" : "Dark"} Mode
              </button> */}

           
              {user && (
                <button
                  onClick={logOut}
                  className={`w-full px-4 py-3 mt-4 text-left rounded-lg transition-colors ${currentTheme.logout}`}
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </aside>

     
        <main className={`flex-1 min-h-screen p-4 lg:p-6 transition-colors duration-300 ${currentTheme.content} `}>
       
          {mobileMenuOpen && (
            <div 
              className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
          )}
          
          <div className={`rounded-lg shadow p-4 lg:p-6 min-h-[calc(100vh-8rem)] transition-colors duration-300 ${currentTheme.card}`}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
