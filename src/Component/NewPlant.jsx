import { useContext, useEffect, useState } from "react";
import { Link } from "react-router"; // Fixed import
import { ThemeContext } from "./Theme";
import { Helmet } from "react-helmet-async";

const NewPlants = () => {
  const { theme } = useContext(ThemeContext);
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://mango-server-ten.vercel.app/mango")
      .then((res) => res.json())
      .then((data) => {
        const latestSix = data.slice(-8).reverse();
        setPlants(latestSix);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching plant data:", error);
        setLoading(false);
      });
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
          <p className="text-lg font-semibold text-white drop-shadow-lg">
            Loading, please wait...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section
      className={`mx-auto max-w-8xl pt-16 px-4 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <Helmet>
        <title>Mango Grove Tracker | Home</title>
      </Helmet>
      <h2 className="mb-6 text-3xl font-bold text-center text-green-800 lg:16">
        New Plants
      </h2>

      {plants.length === 0 ? (
        <p className="text-lg font-medium text-center text-gray-500">
          No plants found. Please add some plants.
        </p>
      ) : (
        <div className="grid gap-6 lg:py-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
          {plants.map((plant) => (
            <div
              key={plant._id}
              className={`overflow-hidden transition-transform shadow-lg rounded-xl hover:scale-105 ${
                theme === "dark" ? "bg-gray-800" : "bg-green-50"
              }`}
            >
              <img
                src={plant.image}
                alt={plant.plantName}
                className="object-cover w-full h-48 rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-green-800">
                  {plant.plantName}
                </h3>
                <p className="text-sm text-gray-500">
                  {plant.category} | Care: {plant.careLevel}
                </p>
                <Link to={`/plant/${plant._id}`}>
                  <button className="text-white bg-green-600 border-none lg:mt-2 btn btn-sm">
                    See More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default NewPlants;