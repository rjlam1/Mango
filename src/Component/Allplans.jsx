import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { ThemeContext } from "./Theme";
import { Helmet } from "react-helmet-async";

const AllPlants = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [plants, setPlants] = useState([]);
  const [filteredPlants, setFilteredPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: "nextWateringDate",
    direction: "asc",
  });
  const [filters, setFilters] = useState({
    category: "",
    careLevel: "",
    searchQuery: "",
  });

  // Fetch plants data
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://mango-server-ten.vercel.app/mango");
        if (!response.ok) {
          throw new Error("Failed to fetch plants");
        }
        const data = await response.json();
        setPlants(data);
        setFilteredPlants(data);
      } catch (error) {
        console.error("Error fetching plants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlants();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...plants];

    // Apply filters
    if (filters.category) {
      result = result.filter((plant) => plant.category === filters.category);
    }
    if (filters.careLevel) {
      result = result.filter(
        (plant) => plant.careLevel.toLowerCase() === filters.careLevel.toLowerCase()
      );
    }
    if (filters.searchQuery) {
      result = result.filter((plant) =>
        plant.plantName.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortConfig.key === "name") {
        return sortConfig.direction === "asc"
          ? a.plantName.localeCompare(b.plantName)
          : b.plantName.localeCompare(a.plantName);
      } else if (sortConfig.key === "careLevel") {
        const careLevelMap = { difficult: 1, easy: 2, moderate: 3 };
        const aLevel = careLevelMap[a.careLevel.toLowerCase()] || 4;
        const bLevel = careLevelMap[b.careLevel.toLowerCase()] || 4;
        return sortConfig.direction === "asc" ? aLevel - bLevel : bLevel - aLevel;
      } else if (sortConfig.key === "nextWateringDate") {
        return sortConfig.direction === "asc"
          ? new Date(a.nextWateringDate) - new Date(b.nextWateringDate)
          : new Date(b.nextWateringDate) - new Date(a.nextWateringDate);
      }
      return 0;
    });

    setFilteredPlants(result);
  }, [plants, sortConfig, filters]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const resetFilters = () => {
    setFilters({
      category: "",
      careLevel: "",
      searchQuery: "",
    });
    setSortConfig({
      key: "nextWateringDate",
      direction: "asc",
    });
  };

  // Get unique categories and care levels for filter options
  const categories = [...new Set(plants.map((plant) => plant.category))];
  const careLevels = [...new Set(plants.map((plant) => plant.careLevel))];

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
    <div
      className={`px-4 min-h-screen max-w-9xl mx-auto py-6 ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Helmet>
        <title>Mango Grove Tracker | All Plants</title>
      </Helmet>

      <div className="mx-auto max-w-8xl">
        <h2 className="inline-grid mb-6 text-3xl font-bold text-center text-green-800 md:text-4xl">
          All Plants
        </h2>

        {/* Filter and Sort Controls */}
        <div
          className={`flex flex-wrap justify-between gap-4 mb-8 p-4 rounded-lg ${
            isDark ? "bg-gray-800" : "bg-green-50"
          }`}
        >
          {/* Search */}
          <div className="w-full md:w-auto">
            <label htmlFor="search" className="block mb-1 font-medium">
              Search Plants
            </label>
            <input
              type="text"
              id="search"
              name="searchQuery"
              value={filters.searchQuery}
              onChange={handleFilterChange}
              placeholder="Search by name..."
              className={`p-2 border rounded w-full ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-black border-gray-300"
              }`}
            />
          </div>

          {/* Category Filter */}
          <div className="w-full sm:w-auto">
            <label htmlFor="category" className="block mb-1 font-medium">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={filters.category}
              onChange={handleFilterChange}
              className={`p-2 border rounded w-full ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Care Level Filter */}
          <div className="w-full sm:w-auto">
            <label htmlFor="careLevel" className="block mb-1 font-medium">
              Care Level
            </label>
            <select
              id="careLevel"
              name="careLevel"
              value={filters.careLevel}
              onChange={handleFilterChange}
              className={`p-2 border rounded w-full ${
                isDark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-white text-black border-gray-300"
              }`}
            >
              <option value="">All Levels</option>
              {careLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Button */}
          <div className="flex items-end w-full sm:w-auto">
            <button
              onClick={resetFilters}
              className={`px-4 py-2 rounded ${
                isDark
                  ? "bg-gray-600 hover:bg-gray-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-800"
              } transition-colors`}
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Sort Controls */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <span className="self-center font-medium">Sort by:</span>
          {["name", "careLevel", "nextWateringDate"].map((key) => (
            <button
              key={key}
              onClick={() => requestSort(key)}
              className={`px-4 py-2 cursor-pointer rounded-lg transition-colors ${
                sortConfig.key === key
                  ? isDark
                    ? "bg-green-700 text-white"
                    : "bg-green-600 text-white"
                  : isDark
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {key === "name" && "Plant Name"}
              {key === "careLevel" && "Care Level"}
              {key === "nextWateringDate" && "Watering Date"}
              {sortConfig.key === key && (
                <span className="ml-1">
                  {sortConfig.direction === "asc" ? "↑" : "↓"}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Plants Grid */}
        {filteredPlants.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-xl text-gray-500">
              No plants found matching your criteria.
            </p>
            <button
              onClick={resetFilters}
              className={`mt-4 px-4 py-2 rounded cursor-pointer${
                isDark
                  ? "bg-green-700 hover:bg-green-600 text-white"
                  : "bg-green-600 hover:bg-green-700 text-white"
              } transition-colors`}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredPlants.map((plant) => (
              <div
                key={plant._id}
                className={`rounded-lg overflow-hidden shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 ${
                  isDark ? "bg-gray-800" : "bg-white"
                }`}
              >
                {/* Plant Image */}
                <div className="flex items-center justify-center h-48 bg-green-100">
                  {plant.image ? (
                    <img
                      src={plant.image}
                      alt={plant.plantName}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "";
                        e.target.parentElement.classList.add(
                          "flex",
                          "items-center",
                          "justify-center"
                        );
                      }}
                    />
                  ) : (
                    <span className="text-gray-500">No image available</span>
                  )}
                </div>

                {/* Plant Details */}
                <div className="p-4">
                  <h3 className="mb-2 text-xl font-semibold truncate">
                    {plant.plantName}
                  </h3>
                  <div className="space-y-2">
                    <p className="truncate">
                      <span className="font-medium">Category:</span>{" "}
                      {plant.category}
                    </p>
                    <p>
                      <span className="font-medium">Watering:</span>{" "}
                      {plant.wateringFrequency}
                    </p>
                    <p>
                      <span className="font-medium">Next Watering:</span>{" "}
                      {new Date(plant.nextWateringDate).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-medium">Care Level:</span>{" "}
                      <span
                        className={`capitalize ${
                          plant.careLevel.toLowerCase() === "easy"
                            ? "text-green-500"
                            : plant.careLevel.toLowerCase() === "moderate"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {plant.careLevel}
                      </span>
                    </p>
                  </div>

                  {/* View Details Button */}
                  <div className="mt-4">
                    <Link to={`/plant/${plant._id}`}>
                      <button
                        className={`w-full py-2 cursor-pointer rounded-lg ${
                          isDark
                            ? "bg-green-700 hover:bg-green-600"
                            : "bg-green-600 hover:bg-green-700"
                        } text-white transition-colors`}
                      >
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPlants;