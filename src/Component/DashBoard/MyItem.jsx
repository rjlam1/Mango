import React, { useState, useEffect, useContext } from "react";
import {
  FiEdit,
  FiTrash2,
  FiDroplet,
  FiHeart,
  FiClock,
  FiPlus,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../PrivateRouter/AuthPrivate"; 

const MyItems = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (!user) {
      
      navigate("/login");
      return;
    }

    const fetchItems = async () => {
      try {
        const response = await fetch(
          "https://mango-server-ten.vercel.app/mango"
        );
        if (!response.ok) throw new Error("Failed to fetch items");
        const data = await response.json();
        const userItems = data.filter((item) => item.userEmail === user.email);
        setItems(userItems);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [user, navigate]); 

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://mango-server-ten.vercel.app/mango/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${await user.getIdToken()}`, 
          },
        }
      );
      if (!response.ok) throw new Error("Failed to delete item");
      setItems(items.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const filteredItems = items.filter((item) => {
    if (filter === "healthy") return item.healthStatus === "Healthy";
    if (filter === "needs-care") return item.healthStatus !== "Healthy";
    return true;
  });


  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 text-center text-red-600 bg-red-100 rounded-lg"
      >
        Error: {error}
      </motion.div>
    );

  if (items.length === 0)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center p-8 text-center"
      >
        <div className="p-6 mb-4 bg-gray-100 rounded-full">
          <FiPlus className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="mb-2 text-xl font-semibold text-green-800">No plants yet</h3>
        <p className="mb-4 text-gray-600">
          Add your first plant to get started
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/dashboard/add-item")}
          className="px-6 py-2 text-white transition-all duration-300 rounded-full bg-gradient-to-r from-green-400 to-blue-500 hover:shadow-lg"
        >
          Add Your First Plant
        </motion.button>
      </motion.div>
    );

  return (
    <div className="p-6">
      <div className="flex flex-col justify-between mb-8 space-y-4 md:flex-row md:space-y-0">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="{`mb-8 text-2xl font-bold ${
  theme === 'dark' ? ' text-green-800 ' : ' text-green-800 '
}`}"
        >
          {user?.displayName || user?.email}'s Plants
        </motion.h1>


        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      
          <div className="flex flex-wrap gap-2 p-1 bg-white rounded-lg shadow-sm sm:space-x-2 sm:flex-nowrap">
            <button
              onClick={() => setFilter("all")}
              className={`flex-1 min-w-[80px] h-10 px-3 text-sm rounded-md transition-colors sm:min-w-[100px] sm:px-4 ${
                filter === "all"
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("healthy")}
              className={`flex-1 min-w-[80px] h-10 px-3 text-sm rounded-md transition-colors sm:min-w-[100px] sm:px-4 ${
                filter === "healthy"
                  ? "bg-green-100 text-green-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Healthy
            </button>
            <button
              onClick={() => setFilter("needs-care")}
              className={`flex-1 min-w-[80px] h-10 px-3 text-sm rounded-md transition-colors sm:min-w-[100px] sm:px-4 ${
                filter === "needs-care"
                  ? "bg-yellow-100 text-yellow-600 font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Needs Care
            </button>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard/add-item")}
            className="w-full h-12 px-4 py-2  text-md text-white transition-all duration-300 rounded-lg shadow-lg sm:w-auto sm:min-w-[100px] sm:p-3 bg-gradient-to-r from-green-500 to-teal-600 hover:shadow-xl"
          >
            <div className="flex items-center justify-center space-x-2">
              <FiPlus className="flex-shrink-0" />
              <span className="whitespace-nowrap">Add New</span>
            </div>
          </motion.button>
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-8 text-center bg-white rounded-lg shadow"
        >
          <FiHeart className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold">No plants match your filter</h3>
          <p className="mt-2 text-gray-600">
            Try changing your filter criteria
          </p>
        </motion.div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {filteredItems.map((item) => (
            <motion.div
              key={item._id}
              variants={itemAnimation}
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
              }}
              className="overflow-hidden transition-all duration-300 bg-white shadow-md rounded-xl hover:shadow-xl"
            >
              <div className="relative h-48 overflow-hidden group">
                <img
                  src={
                    item.image ||
                    "https://images.unsplash.com/photo-1526397751294-331021109fbd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
                  }
                  alt={item.plantName}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-xl font-bold">{item.plantName}</h3>
                  <div
                    className={`inline-block px-3 py-1 mt-1 text-xs font-semibold rounded-full ${
                      item.healthStatus === "Healthy"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.healthStatus}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center mb-4 space-x-4 text-sm">
                  <div className="flex items-center space-x-1 text-blue-600">
                    <FiDroplet />
                    <span>{item.wateringFrequency}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-purple-600">
                    <FiClock />
                    <span>
                      {new Date(item.nextWateringDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-500">
                      Care Level
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        item.careLevel === "easy"
                          ? "bg-green-100 text-green-800"
                          : item.careLevel === "moderate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.careLevel}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${
                        item.careLevel === "easy"
                          ? "bg-green-500"
                          : item.careLevel === "moderate"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{
                        width:
                          item.careLevel === "easy"
                            ? "30%"
                            : item.careLevel === "moderate"
                            ? "60%"
                            : "90%",
                      }}
                    ></div>
                  </div>
                </div>

                <p className="mb-6 text-gray-600 line-clamp-3">
                  {item.description}
                </p>

                <div className="flex space-x-3">
                
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(item._id)}
                    className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    <FiTrash2 size={16} />
                    
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}


      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3"
      >
        <div className="p-6 bg-white shadow rounded-xl">
          <h3 className="text-lg font-semibold text-gray-700">Total Plants</h3>
          <p className="text-3xl font-bold text-blue-600">{items.length}</p>
        </div>
        <div className="p-6 bg-white shadow rounded-xl">
          <h3 className="text-lg font-semibold text-gray-700">
            Healthy Plants
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {items.filter((i) => i.healthStatus === "Healthy").length}
          </p>
        </div>
        <div className="p-6 bg-white shadow rounded-xl">
          <h3 className="text-lg font-semibold text-gray-700">
            Needs Attention
          </h3>
          <p className="text-3xl font-bold text-yellow-600">
            {items.filter((i) => i.healthStatus !== "Healthy").length}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default MyItems;
