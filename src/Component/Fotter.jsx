import { FaEnvelope, FaFacebook, FaInstagram, FaPhone, FaTwitter } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="px-6 py-10 text-white bg-green-900">
      <div className="grid max-w-6xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
        {/* Website Info */}
        <div>
          <h2 className="mb-2 text-2xl font-bold">🌿 Plant Care Tracker</h2>
          <p className="text-sm">
            Helping you grow happier, healthier plants with smart tracking and care tips.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="mb-2 text-xl font-semibold">Contact</h3>
          <p className="flex items-center gap-2">
            <FaEnvelope /> support@plantcaretracker.com
          </p>
          <p className="flex items-center gap-2 mt-1">
            <FaPhone /> +123 456 7890
          </p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="mb-2 text-xl font-semibold">Follow Us</h3>
          <div className="flex gap-4 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook className="transition hover:text-green-300" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="transition hover:text-green-300" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="transition hover:text-green-300" />
            </a>
          </div>
        </div>
      </div>

      <hr className="my-6 border-green-700" />
      <p className="text-sm text-center text-gray-300">
        &copy; {new Date().getFullYear()} Plant Care Tracker. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
