import { useEffect, useState } from "react";
import { Link } from "react-router";

const NewPlants = () => {
  const [plants, setPlants] = useState([]);
  console.log(plants.image);
  useEffect(() => {
    fetch("http://localhost:5000/Mango")
      .then((res) => res.json())
      .then((data) => {
        const latestSix = data.slice(-6).reverse(); // Last 6 entries
        setPlants(latestSix);
      });
  }, []);

  return (
    <section className="px-4 py-12 mx-auto max-w-8xl">
      <h2 className="mb-6 text-3xl font-bold text-center text-green-700">
        🌿 New Plants
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {plants.map((plant) => (
          <div
            key={plant._id}
            className="overflow-hidden transition-all duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl"
          >
            <img
              src={plant.image}
              alt={plant.plantName}
              className="object-cover w-full h-48"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-green-800">
                {plant.plantName}
              </h3>
              <p className="text-sm text-gray-500">
                {plant.category} | Care: {plant.careLevel}
              </p>
              <Link to={`/plant/${plant._id}`}>
                <button className="w-full mt-3 rounded-full btn btn-sm btn-success">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewPlants;
