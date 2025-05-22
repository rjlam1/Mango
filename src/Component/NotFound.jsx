import { Link } from "react-router";
import { ThemeContext } from "./Theme";
import { useContext } from "react";

const NotFound = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
      <div className="text-center">
        <h1 className="mb-4 font-bold text-green-600 text-9xl">404</h1>
        <h2 className="mb-6 text-3xl font-semibold">Plant Not Found!</h2>
        <p className={`text-xl mb-8 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="px-6 py-3 text-lg font-medium text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
        >
          Back to Home Garden
        </Link>
      </div>
    </div>
  );
};

export default NotFound;