import { useContext } from "react";
import { FaTint, FaSun, FaHandScissors, FaBug, FaHands } from "react-icons/fa";
import { ThemeContext } from "./Theme";
import { Helmet } from "react-helmet-async";

const TopPlantCareMistakes = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const mistakes = [
    {
      icon: <FaTint className="text-3xl text-red-500" />,
      title: "Overwatering",
      description: "Too much water suffocates roots and promotes root rot.",
    },
    {
      icon: <FaSun className="text-3xl text-yellow-400" />,
      title: "Wrong Lighting",
      description: "Placing shade-loving plants in direct sun can burn leaves.",
    },
    {
      icon: <FaHands className="text-3xl text-green-500" />,
      title: "Neglecting Pruning",
      description: "Dead leaves or stems can drain energy and spread disease.",
    },
    {
      icon: <FaBug className="text-3xl text-orange-500" />,
      title: "Ignoring Pests",
      description: "Small pests can damage or kill plants if left untreated.",
    },
  ];

  return (
    
    <section className={`px-4 py-16 ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
      <div className="mx-auto text-center">
        <h2 className="mb-6 text-3xl font-bold text-green-800">Top Plant Care Mistakes</h2>
        <p className={`mb-10 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Avoid these common issues to keep your plants healthy and thriving.
        </p>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {mistakes.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 transition-transform shadow-lg rounded-xl hover:scale-105 ${
                isDark ? "bg-gray-800" : "bg-green-50"
              }`}
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className={`mb-2 text-lg font-semibold ${isDark ? "text-white" : "text-gray-800"}`}>
                {item.title}
              </h3>
              <p className={`${isDark ? "text-gray-300" : "text-gray-600"}`}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopPlantCareMistakes;
