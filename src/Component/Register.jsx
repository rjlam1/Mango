import React, { useContext, useState } from "react";
import { AuthContext } from "../PrivateRouter/AuthPrivate";
import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  FaUser,
  FaImage,
  FaEnvelope,
  FaLock,
  FaArrowRight,
} from "react-icons/fa";
import { ThemeContext } from "./Theme";
import { Helmet } from "react-helmet-async";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
  });
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPasswordValidations({
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    setError("");
    setIsLoading(true);

    if (
      !passwordValidations.length ||
      !passwordValidations.uppercase ||
      !passwordValidations.lowercase
    ) {
      setError("Password does not meet all requirements");
      setIsLoading(false);
      return;
    }

    try {
      const res = await createUser(email, password);
      await updateUserProfile(name, photo);
      navigate("/");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const themeStyles = {
    light: {
      background: "bg-gradient-to-br from-green-50 to-white",
      card: "bg-white border-green-100",
      header: "bg-gradient-to-r from-green-500 to-emerald-600",
      input: "text-gray-800 placeholder-gray-400 border-gray-300",
      error: "bg-red-50 border-red-100 text-red-600",
      button: "from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700",
      link: "text-green-600 hover:text-green-500",
      text: "text-gray-600",
      validation: {
        valid: "text-green-500",
        invalid: "text-gray-400"
      }
    },
    dark: {
      background: "bg-gradient-to-br from-gray-800 to-gray-900",
      card: "bg-gray-800 border-gray-700",
      header: "bg-gradient-to-r from-gray-700 to-gray-800",
      input: "text-gray-200 placeholder-gray-400 border-gray-600 bg-gray-700",
      error: "bg-red-900 border-red-800 text-red-200",
      button: "from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700",
      link: "text-green-400 hover:text-green-300",
      text: "text-gray-300",
      validation: {
        valid: "text-green-400",
        invalid: "text-gray-500"
      }
    }
  };

  const currentTheme = themeStyles[theme] || themeStyles.light;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center justify-center p-4 ${currentTheme.background}`}
    >
      <div className="w-full max-w-md">
        <Helmet>
          <title>Mango Grove Tracker | Register</title>
        </Helmet>
        <motion.div
          whileHover={{ y: -5 }}
          className={`overflow-hidden border shadow-2xl rounded-xl ${currentTheme.card}`}
        >
          <div className={`p-6 text-center ${currentTheme.header}`}>
            <h2 className="text-3xl font-bold text-white">Create Account</h2>
            <p className="mt-1 text-green-100">
              Join our mango plant community
            </p>
          </div>

          <div className="p-8">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center p-3 mb-6 border rounded-lg ${currentTheme.error}`}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {error}
              </motion.div>
            )}

            <form onSubmit={handleRegister} className="space-y-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaUser className="w-5 h-5 text-green-500" />
                </div>
                <input
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  required
                  className={`w-full py-3 pl-10 pr-4 placeholder-gray-400 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${currentTheme.input}`}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaImage className="w-5 h-5 text-green-500" />
                </div>
                <input
                  name="photo"
                  type="url"
                  placeholder="Photo URL"
                  required
                  className={`w-full py-3 pl-10 pr-4 placeholder-gray-400 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${currentTheme.input}`}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaEnvelope className="w-5 h-5 text-green-500" />
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  required
                  className={`w-full py-3 pl-10 pr-4 placeholder-gray-400 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${currentTheme.input}`}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaLock className="w-5 h-5 text-green-500" />
                </div>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  onChange={handlePasswordChange}
                  className={`w-full py-3 pl-10 pr-4 placeholder-gray-400 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${currentTheme.input}`}
                />
              </div>

              <div className="space-y-2">
                <div
                  className={`flex items-center ${
                    passwordValidations.length
                      ? currentTheme.validation.valid
                      : currentTheme.validation.invalid
                  }`}
                >
                  <span className="mr-2">•</span>
                  <span>At least 6 characters</span>
                </div>
                <div
                  className={`flex items-center ${
                    passwordValidations.uppercase
                      ? currentTheme.validation.valid
                      : currentTheme.validation.invalid
                  }`}
                >
                  <span className="mr-2">•</span>
                  <span>Contains uppercase letter</span>
                </div>
                <div
                  className={`flex items-center ${
                    passwordValidations.lowercase
                      ? currentTheme.validation.valid
                      : currentTheme.validation.invalid
                  }`}
                >
                  <span className="mr-2">•</span>
                  <span>Contains lowercase letter</span>
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 cursor-pointer text-white font-medium rounded-lg shadow-md transition-all flex items-center justify-center ${
                  isLoading ? "opacity-70" : ""
                } bg-gradient-to-r ${currentTheme.button}`}
              >
                {isLoading ? (
                  <svg
                    className="w-5 h-5 mr-3 -ml-1 text-white animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <FaArrowRight className="mr-2" />
                )}
                {isLoading ? "Creating account..." : "Register Now"}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className={currentTheme.text}>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className={`font-medium transition-colors ${currentTheme.link}`}
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Register;