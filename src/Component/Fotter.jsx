
import React, { useContext } from "react";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaLeaf,
  FaInstagram,
} from "react-icons/fa";
import { ThemeContext } from "./Theme";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <footer
      className={`px-6 py-12 text-white ${
        theme === "dark"
          ? "bg-gradient-to-r from-gray-900 via-gray-900 to-gray-900"
          : "bg-gradient-to-r from-green-950 via-green-900 to-green-800"
      }`}
    >
      <div className="grid grid-cols-1 gap-10 mx-auto max-w-8xl md:grid-cols-2 lg:grid-cols-4">
        {/* Brand Section */}
        <div>
          <h2 className="flex items-center gap-2 mb-3 text-2xl font-bold">
            <FaLeaf className="text-green-400" />
            JobTrack & PlantCare
          </h2>
          <p className="text-sm leading-relaxed text-gray-300">
            Empowering job seekers and plant lovers to thrive—whether you're
            growing a career or nurturing greens.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link to="/" className="hover:text-white">Home</Link>
            </li>
            <li>
              <Link to="/addPlants" className="hover:text-white">AddPlant</Link>
            </li>
            <li>
              <Link to="/allPlants" className="hover:text-white">AllPlant</Link>
            </li>
            <li>
              <Link to="/myPlants" className="hover:text-white">MyPlant</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">Get in Touch</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-green-400" />
              support@yourdomain.com
            </li>
            <li className="flex items-center gap-2">
              <FaPhone className="text-green-400" />
              +123 456 7890
            </li>
          </ul>
        </div>

        {/* Newsletter + Social */}
        <div>
          <h3 className="mb-3 text-lg font-semibold">Subscribe</h3>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 text-sm text-white placeholder-gray-400 bg-gray-800 rounded focus:outline-none"
            />
            <button className="py-2 text-sm font-medium bg-green-600 rounded hover:bg-green-700">
              Subscribe
            </button>
          </form>
          <div className="flex gap-4 mt-5 text-xl text-gray-400">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaTwitter /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaLinkedinIn /></a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaGithub /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <hr className="w-11/12 mx-auto my-6 border-green-700" />

      <p className="text-sm text-center text-gray-400">
        &copy; {new Date().getFullYear()} JobTrack & PlantCare. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
