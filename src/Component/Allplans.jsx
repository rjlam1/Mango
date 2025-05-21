import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { ThemeContext } from "./Theme";

const AllPlants = () => {
    const { theme } = useContext(ThemeContext);
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("nextWateringDate");

  useEffect(() => {
    fetch("http://localhost:5000/mango")
      .then((res) => res.json())
      .then((data) => {
        setPlants(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // sorting logic
  const sortedPlants = [...plants].sort((a, b) => {
    if (sortBy === "nextWateringDate") {
      return new Date(a.nextWateringDate) - new Date(b.nextWateringDate);
    }
    if (sortBy === "careLevel") {
      return a.careLevel - b.careLevel;
    }
    return 0;
  });

  if (loading)
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
// 
  return (
    <div className={`px-4 max-w-6xl p-4 mx-auto py-16 ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
      <h2 className="mb-6 text-3xl font-bold text-center text-green-700">
        🌿 All Plants
      </h2>

      {/* Sorting selector */}
      <div className="mb-4">
        <label htmlFor="sort" className="mr-2 font-semibold">
          Sort By:
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded"
        >
          <option className="text-sm font-bold text-gray-600" value="nextWateringDate ">Next Watering Date</option>
          <option className="text-sm font-bold text-gray-600" value="careLevel">Care Level</option>
        </select>
      </div>

      {/* Plants table */}
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead className="text-green-800 bg-green-100">
            <tr>
              <th>Index</th>
              <th>Plant Name</th>
              <th>Category</th>
              <th>Watering Frequency</th>
              <th>Next Watering Date</th>
              <th>Care Level</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlants.map((plant, index) => (
              <tr key={plant._id}>
                <td>{index + 1}</td>
                <td>{plant.plantName}</td>
                <td>{plant.category}</td>
                <td>{plant.wateringFrequency}</td>
                <td>{plant.nextWateringDate}</td>
                <td>{plant.careLevel}</td>
                <td>
                  <Link to={`/plant/${plant._id}`}>
                    <button className="bg-green-600 btn btn-sm ">
                      View Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPlants;
