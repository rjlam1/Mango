import React  from "react";
import TopPlantCareMistakes from "./Topplan";
import BeginnerFriendlyPlants from "./Beginaer";
import { ThemeContext } from "./Theme";
import { useContext } from "react";

const Home = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <div className="min-h-screen text-gray-900 transition-colors duration-300 bg-white dark:bg-gray-900 dark:text-gray-100">
      {/* থিম টগল বাটন */}
      <div className="flex justify-end p-4">
        <button
          onClick={toggleTheme}
          className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
        >
          Switch to {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
      </div>

      {/* তোমার মেইন কন্টেন্ট */}
      <TopPlantCareMistakes />
      <BeginnerFriendlyPlants />
    </div>
  );
};

export default Home;
