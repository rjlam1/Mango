import { Link } from "react-router-dom";
import { ThemeContext } from "./Theme";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen p-4 transition-colors duration-300 ${isDark ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"}`}>
      <Helmet>
        <title>Mango Grove Tracker | Page Not Found</title>
        <meta name="description" content="The page you're looking for doesn't exist in our Mango Grove Tracker system." />
      </Helmet>
      
      <div className="max-w-md mx-auto text-center">
        <div className="relative mb-8">
          <span className="block font-bold text-green-500 text-9xl opacity-10">404</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-40 h-40 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <h2 className="mb-4 text-2xl font-bold md:text-3xl">Plant Not Found!</h2>
        
        <p className={`text-lg mb-8 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          We couldn't find the page you're looking for. It might have been moved, 
          deleted, or perhaps you mistyped the address.
        </p>
        
        <div className="space-y-4">
          <Link
            to="/"
            className={`inline-block w-full sm:w-auto px-8 py-3 font-medium rounded-lg transition-all duration-300 ${isDark ? 
              "bg-green-600 hover:bg-green-700 text-white" : 
              "bg-green-500 hover:bg-green-600 text-white"}`}
          >
            Return to Home Garden
          </Link>
          
          <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            Need help? <Link to="/Support" className="text-green-400 hover:underline">Contact support</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;