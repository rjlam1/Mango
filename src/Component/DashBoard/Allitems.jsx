import React, { useState, useEffect, useContext } from "react";
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import { ThemeContext } from "../Theme";
import { AuthContext } from "../../PrivateRouter/AuthPrivate";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Trash2, UserPen } from "lucide-react";

const AllItems = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        const response = await fetch(
          "https://mango-server-ten.vercel.app/mango"
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch all items: ${response.statusText}`);
        }
        const data = await response.json();
        setItems(data);
      } catch (err) {
        console.error("Error fetching all items:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAllItems();
  }, []);

  const filteredItems = items.filter(
    (item) =>
      item.plantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Authentication Required",
        text: "You must be logged in to delete an item.",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/login");
      });
      return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
      customClass: {
        popup: theme === "dark" ? "swal2-dark-mode" : "",
        confirmButton:
          "bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg shadow transition-colors",
        cancelButton:
          "bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg shadow transition-colors",
      },
    });

    if (!result.isConfirmed) return;

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
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete item: ${errorText}`);
      }
      setItems(items.filter((item) => item._id !== id));
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Your item has been deleted.",
        customClass: {
          popup: theme === "dark" ? "swal2-dark-mode" : "",
        },
      });
    } catch (err) {
      console.error("Error deleting item:", err);
      setError(err.message);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: `Error deleting item: ${err.message}`,
        customClass: {
          popup: theme === "dark" ? "swal2-dark-mode" : "",
        },
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-white rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-600 bg-red-100 rounded-lg dark:bg-red-900 dark:text-red-200">
        Error: {error}
      </div>
    );
  }

  return (
    <div
      className={`transition-colors duration-300 ${
        theme === "dark" ? "text-white" : "text-gray-900"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">All Items</h1>
        <div className="relative">
          <FiSearch className="absolute text-gray-400 transform -translate-y-1/2 dark:text-gray-300 left-3 top-1/2" />
          <input
            type="text"
            placeholder="Search items..."
            className={`py-2 pl-8 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500
              ${
                theme === "dark"
                  ? "bg-gray-700 text-white placeholder-gray-300 border-gray-600"
                  : "bg-white text-black placeholder-gray-500 border-gray-300"
              }`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        {filteredItems.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400">
            No items found.
          </p>
        ) : (
          <table
            className={`min-w-full overflow-hidden rounded-lg 
            ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-900"
            }`}
          >
            <thead
              className={
                theme === "dark"
                  ? "bg-gray-700 text-gray-300"
                  : "bg-gray-100 text-gray-600"
              }
            >
              <tr>
                <th className="px-4 py-3 text-left">Image</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Care Level</th>
                <th className="px-4 py-3 text-left">Health Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody
              className={
                theme === "dark"
                  ? "divide-y divide-gray-600"
                  : "divide-y divide-gray-200"
              }
            >
              {filteredItems.map((item) => (
                <tr
                  key={item._id}
                  className={
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"
                  }
                >
                  <td className="px-4 py-4">
                    <img
                      src={item.image || "https://via.placeholder.com/50"}
                      alt={item.plantName}
                      className="object-cover w-12 h-12 rounded-md"
                    />
                  </td>
                  <td className="px-4 py-4">{item.plantName}</td>
                  <td className="px-4 py-4">{item.category}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.careLevel === "easy"
                          ? theme === "dark"
                            ? "bg-green-900 text-green-200"
                            : "bg-green-100 text-green-800"
                          : item.careLevel === "moderate"
                          ? theme === "dark"
                            ? "bg-yellow-900 text-yellow-200"
                            : "bg-yellow-100 text-yellow-800"
                          : theme === "dark"
                          ? "bg-red-900 text-red-200"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.careLevel}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.healthStatus === "Healthy"
                          ? theme === "dark"
                            ? "bg-green-900 text-green-200"
                            : "bg-green-100 text-green-800"
                          : theme === "dark"
                          ? "bg-yellow-900 text-yellow-200"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.healthStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex space-x-2">
                      <Link
                        to={`/update/${item._id}`}
                        state={{ from: "/dashboard/all-items" }}
                        className={`inline-flex items-center p-2 rounded-md ${
                          theme === "dark"
                            ? "bg-gray-700 hover:bg-gray-600"
                            : "bg-green-100 hover:bg-green-200"
                        }`}
                      >
                        <UserPen className="w-5 h-5 cursor-pointer" />
                      </Link>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:text-red-800 dark:text-red-300 dark:hover:text-red-500"
                        title="Delete Item"
                      >
                       <Trash2 className="w-5 h-5 text-red-500 cursor-pointer" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AllItems;
