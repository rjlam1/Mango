import { useContext } from "react";
import { ThemeContext } from "./Theme";

const plants = [
  {
    name: "Snake Plant",
    image: "https://i.ibb.co/6c9YRYSR/pexels-photo-4505144.webp",
    care: "Low maintenance, tolerates low light.",
  },
  {
    name: "Pothos",
    image: "https://i.ibb.co/S7w24x1D/pexels-photo-15176015.webp",
    care: "Grows quickly and survives irregular watering.",
  },
  {
    name: "ZZ Plant",
    image: "https://i.ibb.co/fzqbQQM2/pexels-photo-5830889.webp",
    care: "Thrives in neglect, low water and light needs.",
  },
  {
    name: "Spider Plant",
    image: "https://i.ibb.co/Zp7fhd4q/pexels-photo-13633450.webp",
    care: "Resilient and grows well in hanging pots.",
  },
];

const BeginnerFriendlyPlants = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <section className={`px-4 py-16 ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
      <div className="mx-auto text-center">
        <h2 className="mb-6 text-3xl font-bold text-green-700">Beginner-Friendly Plants</h2>
        <p className={`mb-10 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          Start your plant journey with these easy-to-care-for options.
        </p>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {plants.map((plant, idx) => (
            <div
              key={idx}
              className={`overflow-hidden transition-transform shadow-md rounded-xl hover:scale-105 hover:shadow-xl ${
                isDark ? "bg-gray-800" : "bg-green-50"
              }`}
            >
              <img src={plant.image} alt={plant.name} className="object-cover w-full h-48" />
              <div className="p-4">
                <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-green-800"}`}>
                  {plant.name}
                </h3>
                <p className={`${isDark ? "text-gray-300" : "text-gray-600"} mt-1 text-sm`}>
                  {plant.care}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BeginnerFriendlyPlants;
