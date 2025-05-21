import React, { useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../PrivateRouter/AuthPrivate";
import { ThemeContext } from "./Theme";

const AddPlant = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const handleAddPlant = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newPlant = Object.fromEntries(formData.entries());

    newPlant.userEmail = user?.email;
    newPlant.userName = user?.displayName;

    fetch("http://localhost:5000/Mango", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPlant),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire("Success!", "Plant added successfully!", "success");
          form.reset();
        }
      });
  };

  const inputStyle = `w-full px-4 py-2 rounded border outline-none transition-all duration-200 ${
    isDark
      ? "bg-gray-900 text-white border-gray-600 placeholder-gray-400"
      : "bg-white text-black border-gray-300"
  }`;

  return (
    <div className={`max-w-5xl px-4 py-10 mx-auto ${isDark ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <div className="mb-10 space-y-4 text-center">
        <h1 className="text-4xl font-bold text-green-700 md:text-5xl">🌱 Add New Plant</h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base">
          Log every detail about your green friend so the Plant Care Tracker can remind you how to take the best care of it.
        </p>
      </div>

      <form onSubmit={handleAddPlant} className="space-y-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {[
            { label: "Image URL", name: "image", type: "text", placeholder: "Photo URL" },
            { label: "Plant Name", name: "plantName", type: "text", placeholder: "e.g., Snake Plant" },
            { label: "Watering Frequency", name: "wateringFrequency", type: "text", placeholder: "e.g., Every 3 days" },
            { label: "Health Status", name: "healthStatus", type: "text", placeholder: "e.g., Healthy / Needs attention" },
            { label: "Last Watered Date", name: "lastWateredDate", type: "date" },
            { label: "Next Watering Date", name: "nextWateringDate", type: "date" },
          ].map(({ label, name, type, placeholder }) => (
            <fieldset key={name} className={`p-4 border shadow-sm rounded-xl ${isDark ? "bg-gray-800 border-gray-600" : "bg-base-100 border-gray-300"}`}>
              <label className="block mb-2 font-medium text-gray-400">{label}</label>
              <input
                type={type}
                name={name}
                className={inputStyle}
                placeholder={placeholder}
                required
              />
            </fieldset>
          ))}

          {/* Category */}
          <fieldset className={`p-4 border shadow-sm rounded-xl ${isDark ? "bg-gray-800 border-gray-600" : "bg-base-100 border-gray-300"}`}>
            <label className="block mb-2 font-medium text-gray-400">Category</label>
            <select name="category" className={inputStyle} required>
              <option value="">Pick one</option>
              <option value="succulent">Succulent</option>
              <option value="fern">Fern</option>
              <option value="flowering">Flowering</option>
              <option value="bonsai">Bonsai</option>
            </select>
          </fieldset>

          {/* Care Level */}
          <fieldset className={`p-4 border shadow-sm rounded-xl ${isDark ? "bg-gray-800 border-gray-600" : "bg-base-100 border-gray-300"}`}>
            <label className="block mb-2 font-medium text-gray-400">Care Level</label>
            <select name="careLevel" className={inputStyle} required>
              <option value="">Pick one</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="difficult">Difficult</option>
            </select>
          </fieldset>
        </div>

        {/* Description */}
        <fieldset className={`p-4 border shadow-sm rounded-xl ${isDark ? "bg-gray-800 border-gray-600" : "bg-base-100 border-gray-300"}`}>
          <label className="block mb-2 font-medium text-gray-400">Description</label>
          <textarea
            name="description"
            className={inputStyle}
            rows="4"
            placeholder="Short description / notes"
            required
          />
        </fieldset>

        {/* Hidden fields */}
        <input type="hidden" name="userEmail" defaultValue={user?.email} />
        <input type="hidden" name="userName" defaultValue={user?.displayName} />

        {/* Submit */}
        <button type="submit" className="w-full p-2 text-lg font-semibold text-white bg-green-700 rounded hover:bg-green-800">
          🌿 Add Plant
        </button>
      </form>
    </div>
  );
};

export default AddPlant;
