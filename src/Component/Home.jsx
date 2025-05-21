
import React, { useContext } from "react";
import TopPlantCareMistakes from "./Topplan";
import BeginnerFriendlyPlants from "./Beginaer";
import { ThemeContext } from "./Theme";
import { Sun, SunMoon } from "lucide-react";
const Home = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="min-h-screen text-gray-900 transition-colors duration-300 bg-white dark:bg-gray-900 dark:text-gray-100">
      <div className="flex justify-end p-4">
        <button
          onClick={() => {
            console.log("Clicked, theme was:", theme);
            toggleTheme();
          }}
          className="px-4 py-2 text-white"
        >
           {theme === "dark" ?  <Sun  size={35}/> :<SunMoon size={35} />}
        </button>
      </div>
      <TopPlantCareMistakes />
      <BeginnerFriendlyPlants />
    </div>
  );
};

export default Home;
