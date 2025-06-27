import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../PrivateRouter/AuthPrivate";
import { Link } from "react-router"; 
import { Trash2, UserPen } from "lucide-react";
import { ThemeContext } from "./Theme";
import { Helmet } from "react-helmet-async";

const MyPlants = () => {
  const { user } = useContext(AuthContext);
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  useEffect(() => {
    if (!user?.email) return;

    setLoading(true);
    fetch(`https://mango-server-ten.vercel.app/mango?email=${user.email}`)
      .then(res => res.json())
      .then(data => {
        setPlants(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://mango-server-ten.vercel.app/mango/${id}`, { method: "DELETE" })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Plant has been deleted.", "success");
              setPlants(plants.filter(p => p._id !== id));
            }
          });
      }
    });
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

  return (
    <div className={`max-w-9xl min-h-screen mx-auto px-4 sm:px-6 lg:px-4 py-6 ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
      <Helmet>
        <title>Mango Grove Tracker | MyPlants</title>
      </Helmet>
      <h1 className={`mb-6 text-4xl font-bold text-center ${isDark ? "text-green-800" : "text-green-800"}`}>My Plants</h1>

      {plants.length === 0 ? (
        <div className="text-center">
          <p className="text-xl">You haven't added any plants yet.</p>
          <Link 
            to="/addPlants" 
            className="inline-block px-6 py-2 mt-4 text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            Add Your First Plant
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse table-auto">
            <thead className={isDark ? "bg-gray-800 text-green-600" : "bg-green-100 text-green-800"}>
              <tr>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Watering Frequency</th>
                <th className="px-4 py-2 text-left">Care Level</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plants.map(plant => (
                <tr key={plant._id} className={`border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}>
                  <td className="px-4 py-2">
                    {plant.image && (
                      <img 
                        src={plant.image} 
                        alt={plant.plantName} 
                        className="object-cover w-16 h-16 rounded"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/64?text=No+Image';
                        }}
                      />
                    )}
                  </td>
                  <td className="px-4 py-2">{plant.plantName}</td>
                  <td className="px-4 py-2">{plant.category}</td>
                  <td className="px-4 py-2">{plant.wateringFrequency}</td>
                  <td className="px-4 py-2">{plant.careLevel}</td>
                  <td className="px-4 py-2 space-x-2 space-y-1">
                    <button>
                      <Link 
                        to={`/update/${plant._id}`} 
                        className={`inline-flex items-center p-2 rounded-md ${isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-green-100 hover:bg-green-200"}`}
                      >
                        <UserPen className="w-5 h-5 cursor-pointer" />
                      </Link>
                    </button>
                    <button 
                      onClick={() => handleDelete(plant._id)} 
                      className={`inline-flex items-center p-2 rounded-md ${isDark ? "bg-gray-700 hover:bg-gray-600" : "bg-green-100 hover:bg-green-200"}`}
                    >
                      <Trash2 className="w-5 h-5 text-red-500 cursor-pointer" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyPlants;
