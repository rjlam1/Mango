// MyPlants.jsx
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../PrivateRouter/AuthPrivate";
import { Link } from "react-router";
import { Trash2, UserPen } from "lucide-react";
import { ThemeContext } from "./Theme";

const MyPlants = () => {
  const { user } = useContext(AuthContext);
  const [plants, setPlants] = useState([]);
  const { theme } = useContext(ThemeContext);
const isDark = theme === "dark";

console.log(plants)
  useEffect(() => {
    fetch(`http://localhost:5000/mango?email=${user.email}`)
      .then(res => res.json())
      .then(data => setPlants(data));
  }, [user.email]);

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
    <div className={`... ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
      <h1 className="mb-6 text-3xl font-bold text-center text-green-700">My Plants</h1>
      <table className="table w-full table-zebra">
        <thead  className={isDark ? "bg-gray-800 text-white" : "bg-green-100 text-green-800"}>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Watering Frequency</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plants.map(plant => (
            <tr key={plant._id}>
             
              <td>{plant.plantName}</td>
              <td>{plant.category}</td>
              <td>{plant.wateringFrequency}</td>
              <td className="space-x-2">
                <Link to={`/update/${plant._id}`} className="btn btn-sm"><UserPen /></Link>
                <button onClick={() => handleDelete(plant._id)} className="btn btn-sm"> <Trash2 /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPlants;
