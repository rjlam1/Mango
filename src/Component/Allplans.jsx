import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const AllPlants = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/mango')
      .then(res => res.json())
      .then(data => {
        setPlants(data);
        setLoading(false);
      });
  }, []);

  if (loading) return<div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-90">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-12 h-12 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
        <p className="text-lg font-semibold text-white drop-shadow-lg">
          Loading, please wait...
        </p>
      </div>
    </div>;

  return (
    <div className="max-w-6xl p-4 mx-auto">
      <h2 className="mb-6 text-3xl font-bold text-center text-green-700">🌿 All Plants</h2>
      <div className="overflow-x-auto">
        <table className="table w-full table-zebra">
          <thead className="text-green-800 bg-green-100">
            <tr>
              <th>Index</th>
              <th>Plant Name</th>
              <th>Category</th>
              <th>Watering Frequency</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plants.map((plant, index) => (
              <tr key={plant._id}>
                <td>{index }</td>
                <td>{plant.plantName}</td>
                <td>{plant.category}</td>
                <td>{plant.wateringFrequency}</td>
                <td>
                  <Link to={`/plant/${plant._id}`}>
                    <button className="btn btn-sm btn-success">View Details</button>
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
