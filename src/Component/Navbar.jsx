import React, { useContext, useState } from 'react';
import {  NavLink, useNavigate } from 'react-router';
import { AuthContext } from '../PrivateRouter/AuthPrivate';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
const navigate=useNavigate()
  const handleLogOut = () => {
    logOut()
      .then(() => console.log("Logged out"))
      .catch(err => console.error(err));
      navigate('/')
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-green-200 shadow-md">
      <div className="flex items-center justify-between px-4 py-3 md:px-24">
        <NavLink to="/" className="text-2xl font-bold text-green-800">
          🌿 PlantCare
        </NavLink>

        {/* Hamburger Icon */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Menu Links */}
        <div className={`md:flex items-center space-x-4 ${isOpen ? 'block' : 'hidden'} md:block`}>
          <NavLink to="/" className="block px-2 py-1 text-green-800">Home</NavLink>
          <NavLink to="/allPlants" className="block px-2 py-1 text-green-800">All Plants</NavLink>
          <NavLink to="/addPlants" className="block px-2 py-1 text-green-800">Add Plant</NavLink>
          <NavLink to="/myPlants" className="block px-2 py-1 text-green-800">My Plants</NavLink>

          {
            user ? (
              <>
                {/* Avatar with tooltip */}
                {user.photoURL && (
                  <div className="relative inline-block group">
                    <img
                      src={user?.photoURL}
                      alt="User"
                      className="w-8 h-8 border border-green-600 rounded-full"
                    />
                    <div className="absolute px-2 py-1 text-sm text-white -translate-x-1/2 bg-green-600 rounded opacity-0 group-hover:opacity-100 -bottom-9 left-1/2">
                      {user?.displayName}
                    </div>
                  </div>
                )}
                <button
                  onClick={handleLogOut}
                  className="px-3 py-1 mt-1 text-white bg-green-700 rounded hover:bg-green-800 md:mt-0"
                >
                  LogOut
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className="block px-2 py-1 bg-green-700 rounded hover:bg-green-800">Login</NavLink>
                <NavLink to=" /register" className="block px-2 py-1 bg-green-700 rounded hover:bg-green-800">Register</NavLink>
              </>
            )
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
