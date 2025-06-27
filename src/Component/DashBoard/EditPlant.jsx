import React from 'react';
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeContext } from "./Theme";
import { Helmet } from "react-helmet-async";

const EditPlant = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    plantName: "",
    category: "",
    wateringFrequency: "",
    nextWateringDate: "",
    careLevel: "",
    description: "",
    image: ""
  });

  // Fetch plant data
  useEffect(() => {
    const fetchPlant = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://mango-server-ten.vercel.app/mango/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch plant");
        }
        const data = await response.json();
        setPlant(data);
        setFormData({
          plantName: data.plantName,
          category: data.category,
          wateringFrequency: data.wateringFrequency,
          nextWateringDate: data.nextWateringDate.split('T')[0],
          careLevel: data.careLevel,
          description: data.description,
          image: data.image
        });
      } catch (error) {
        console.error("Error fetching plant:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlant();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://mango-server-ten.vercel.app/mango/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to update plant");
      }

      navigate('/dashboard/myPlants'); 
    } catch (error) {
      console.error("Error updating plant:", error);
    }
  };

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

  if (!plant) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
        <p className="text-xl">Plant not found</p>
      </div>
    );
  }

  return (
    <div className={`px-4 min-h-screen max-w-9xl mx-auto py-6 ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <Helmet>
        <title>Edit {plant.plantName} | PlantCare</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <h2 className="mb-6 text-3xl font-bold text-center">Edit {plant.plantName}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
           
            <div>
              <label htmlFor="plantName" className="block mb-1 font-medium">
                Plant Name
              </label>
              <input
                type="text"
                id="plantName"
                name="plantName"
                value={formData.plantName}
                onChange={handleChange}
                required
                className={`w-full p-2 border rounded ${isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
              />
            </div>

          
            <div>
              <label htmlFor="category" className="block mb-1 font-medium">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className={`w-full p-2 border rounded ${isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
              >
                <option value="">Select Category</option>
                <option value="flowering">Flowering</option>
                <option value="fruit">Fruit</option>
                <option value="vegetable">Vegetable</option>
                <option value="herb">Herb</option>
              </select>
            </div>

       
            <div>
              <label htmlFor="wateringFrequency" className="block mb-1 font-medium">
                Watering Frequency
              </label>
              <input
                type="text"
                id="wateringFrequency"
                name="wateringFrequency"
                value={formData.wateringFrequency}
                onChange={handleChange}
                required
                className={`w-full p-2 border rounded ${isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
              />
            </div>

            
            <div>
              <label htmlFor="nextWateringDate" className="block mb-1 font-medium">
                Next Watering Date
              </label>
              <input
                type="date"
                id="nextWateringDate"
                name="nextWateringDate"
                value={formData.nextWateringDate}
                onChange={handleChange}
                required
                className={`w-full p-2 border rounded ${isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
              />
            </div>

          
            <div>
              <label htmlFor="careLevel" className="block mb-1 font-medium">
                Care Level
              </label>
              <select
                id="careLevel"
                name="careLevel"
                value={formData.careLevel}
                onChange={handleChange}
                required
                className={`w-full p-2 border rounded ${isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
              >
                <option value="">Select Care Level</option>
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Difficult">Difficult</option>
              </select>
            </div>

          
            <div className="md:col-span-2">
              <label htmlFor="image" className="block mb-1 font-medium">
                Image URL
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                className={`w-full p-2 border rounded ${isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block mb-1 font-medium">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className={`w-full p-2 border rounded ${isDark ? "bg-gray-700 border-gray-600" : "bg-white border-gray-300"}`}
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className={`px-4 py-2 rounded ${isDark ? "bg-gray-600 hover:bg-gray-500" : "bg-gray-200 hover:bg-gray-300"}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded ${isDark ? "bg-green-700 hover:bg-green-600" : "bg-green-600 hover:bg-green-700"}`}
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPlant;