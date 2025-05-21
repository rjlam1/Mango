import { useEffect, useState } from "react";
import { Link } from "react-router";

const NewPlants = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/Mango")
      .then((res) => res.json())
      .then((data) => {
        const latestSix = data.slice(-6).reverse(); // Last 6 entries
        setPlants(latestSix);
      });
  }, []);

  return (
    <section className="max-w-6xl px-4 py-12 mx-auto">
      <h2 className="mb-6 text-3xl font-bold text-center text-green-700">🌿 New Plants</h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {plants.map((plant) => (
          <div key={plant._id} className="p-4 transition-shadow border rounded-lg shadow hover:shadow-lg bg-base-100">
            <img src={plant.image} alt={plant.plantName} className="object-cover w-full h-40 mb-4 rounded" />
            <h3 className="text-xl font-semibold text-green-800">{plant.plantName}</h3>
            <p className="text-sm text-gray-600">{plant.category} | Care: {plant.careLevel}</p>
            <Link to={`/plant/${plant._id}`}>
              <button className="mt-4 btn btn-sm btn-outline btn-success">View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewPlants;
