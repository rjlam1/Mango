import { useContext } from "react";
import { FaEnvelope, FaFacebook, FaInstagram, FaLeaf, FaPhone, FaTwitter } from "react-icons/fa";
import { ThemeContext } from "./Theme";

const Footer = () => {
    const { theme } = useContext(ThemeContext);
  return (
    
    <footer className={`w-full px-6 py-12  text-white ${
      theme === "dark" 
        ? "bg-gradient-to-r from-gray-900 via-gray-900 to-gray-900" 
        : "bg-gradient-to-r from-green-950 via-green-900 to-green-800"
    }`}>
      <div className="grid grid-cols-1 gap-10 mx-auto text-center max-w-8xl md:grid-cols-3 md:text-left">
        
        {/* Website Info */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="flex items-center gap-2 mb-3 text-3xl font-bold">
            <FaLeaf className="text-green-400" /> Plant Care Tracker
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-gray-300">
            Empowering plant lovers to track, manage, and nurture their green companions with confidence and ease.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="mb-3 text-xl font-semibold">Get in Touch</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center justify-center gap-2 md:justify-start">
              <FaEnvelope className="text-green-400" /> support@plantcaretracker.com
            </li>
            <li className="flex items-center justify-center gap-2 md:justify-start">
              <FaPhone className="text-green-400" /> +123 456 7890
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="mb-3 text-xl font-semibold">Follow Us</h3>
          <div className="flex gap-6 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transition hover:text-green-400">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="transition hover:text-green-400">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transition hover:text-green-400">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <hr className="w-11/12 mx-auto my-6 border-green-700" />

      <p className="text-sm text-center text-gray-400">
        &copy; {new Date().getFullYear()} Plant Care Tracker — All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
