import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { ThemeContext } from "./Theme";

const AllPlants = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

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

  return (
    <div className={`px-4 max-w-6xl p-4 mx-auto py-16 ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
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
          className={`p-2 border rounded ${isDark ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-300"}`}
        >
          <option value="nextWateringDate">Next Watering Date</option>
          <option value="careLevel">Care Level</option>
        </select>
      </div>

      {/* Plants table */}
      <div className="overflow-x-auto">
        <table className={`table w-full ${isDark ? "text-white" : "text-black"}`}>
          <thead className={isDark ? "bg-gray-800 text-green-300" : "bg-green-100 text-green-800"}>
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
              <tr key={plant._id} className={isDark ? "hover:bg-gray-800" : "hover:bg-green-50"}>
                <td>{index + 1}</td>
                <td>{plant.plantName}</td>
                <td>{plant.category}</td>
                <td>{plant.wateringFrequency}</td>
                <td>{plant.nextWateringDate}</td>
                <td>{plant.careLevel}</td>
                <td>
                  <Link to={`/plant/${plant._id}`}>
                    <button className="text-white bg-green-600 btn btn-sm hover:bg-green-700">
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
