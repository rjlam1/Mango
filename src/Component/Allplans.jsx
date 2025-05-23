import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { ThemeContext } from "./Theme";
import { Helmet } from "react-helmet-async";

const AllPlants = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("nextWateringDate");

  useEffect(() => {
    setLoading(true);
    fetch(`https://mango-server-ten.vercel.app/mango?sortBy=${sortBy}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setPlants(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [sortBy]);

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
    <div
      className={`px-4 min-h-screen max-w-9xl mx-auto py-16 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Helmet>
        <title>Mango Grove Tracker |  AllPlants</title>
      </Helmet>
      <h2 className="mb-6 text-4xl font-bold text-center text-green-800">
        All Plants
      </h2>

      <div className="flex items-center justify-center mb-4">
        <label htmlFor="sort" className="mr-2 font-semibold">
          Sort By:
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className={`p-2 border rounded ${
            isDark
              ? "bg-gray-800 text-white border-gray-700"
              : "bg-white text-black border-gray-300"
          }`}
        >
          <option value="nextWateringDate">Next Watering Date</option>
          <option value="careLevel">Care Level</option>
        </select>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table
          className={`table-auto w-full border-collapse ${
            isDark ? "text-white" : "text-gray-900"
          }`}
        >
          <thead
            className={`${
              isDark ? "bg-gray-800 text-green-300" : "bg-green-100 text-green-800"
            }`}
          >
            <tr>
              <th className="px-4 py-2 border">Index</th>
              <th className="px-4 py-2 border">Plant Name</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Watering Frequency</th>
              <th className="px-4 py-2 border">Next Watering Date</th>
              <th className="px-4 py-2 border">Care Level</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plants.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-4 text-center">
                  No plants found.
                </td>
              </tr>
            ) : (
              plants.map((plant, index) => (
                <tr
                  key={plant._id}
                  className={isDark ? "hover:bg-gray-700" : "hover:bg-green-50"}
                >
                  <td className="px-4 py-2 text-center border">{index + 1}</td>
                  <td className="px-4 py-2 border">{plant.plantName}</td>
                  <td className="px-4 py-2 border">{plant.category}</td>
                  <td className="px-4 py-2 border">{plant.wateringFrequency}</td>
                  <td className="px-4 py-2 border">
                    {new Date(plant.nextWateringDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 capitalize border">{plant.careLevel}</td>
                  <td className="px-4 py-2 text-center border">
                    <Link to={`/plant/${plant._id}`}>
                      <button className="px-3 py-1 text-sm text-white bg-green-600 rounded cursor-pointer">
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPlants;
