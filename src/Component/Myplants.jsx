import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../PrivateRouter/AuthPrivate";
import { Link } from "react-router";  // <-- react-router-dom theke
import { Trash2, UserPen } from "lucide-react";
import { ThemeContext } from "./Theme";

const MyPlants = () => {
  const { user } = useContext(AuthContext);
  const [plants, setPlants] = useState([]);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  useEffect(() => {
    if (!user?.email) return; // user email check kora
    fetch(`http://localhost:5000/mango?email=${user.email}`)  // <-- myPlants endpoint use koro
      .then(res => res.json())
      .then(data => setPlants(data));
  }, [user?.email]);
console.log(user.email); // user er email console e dekhao

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/mango/${id}`, { method: "DELETE" })
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

  return (
    <div className={`max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 lg:mb-24 py-6 ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
      <h1 className="mb-6 text-3xl font-bold text-center text-green-700">My Plants</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse table-auto">
          <thead className={isDark ? "bg-gray-800 text-green-300" : "bg-green-100 text-green-800"}>
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Watering Frequency</th>
              <th className="px-4 py-2 text-left">Care Level</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plants.map(plant => (
              <tr key={plant._id} className="border-b">
           
                <td className="px-4 py-2">{plant.plantName}</td>
                <td className="px-4 py-2">{plant.category}</td>
                <td className="px-4 py-2">{plant.wateringFrequency}</td>
                <td className="px-4 py-2">{plant.careLevel}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link to={`/update/${plant._id}`} className="inline-flex items-center btn btn-sm"><UserPen /></Link>
                  <button onClick={() => handleDelete(plant._id)} className="inline-flex items-center btn btn-sm"><Trash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPlants;
