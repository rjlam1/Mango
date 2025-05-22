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
     console.log("Form submitted");
    const form = e.target;
    const formData = new FormData(form);
    const newPlant = Object.fromEntries(formData.entries());

    newPlant.userEmail = user?.email;
    newPlant.userName = user?.displayName;

    fetch("http://localhost:5000/mango", {
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

  const inputStyle = `w-full px-4 py-2 rounded-md border transition-all duration-300
    placeholder-opacity-70
    ${
      isDark
        ? "bg-gray-800 text-white border-gray-600 placeholder-gray-400 focus:border-green-500 focus:ring-1 focus:ring-green-500"
        : "bg-white text-gray-900 border-gray-300 placeholder-gray-500 focus:border-green-700 focus:ring-1 focus:ring-green-700"
    }
    outline-none shadow-sm
  `;

  // Special style for date inputs to ensure visibility
  const dateInputStyle = `w-full px-4 py-2 rounded-md border transition-all duration-300
    ${
      isDark
        ? "bg-gray-800 text-white border-gray-600 [color-scheme:dark]"
        : "bg-white text-gray-900 border-gray-300 [color-scheme:light]"
    }
    outline-none shadow-sm
  `;

  // Label style for better visibility
  const labelStyle = isDark ? "text-gray-200" : "text-gray-700";

  return (
    <div
      className={`max-w-9xl px-6 py-10 mx-auto
        ${
          isDark
            ? "bg-gray-900 text-gray-200 shadow-lg shadow-black/40"
            : "bg-white text-gray-900 shadow-md"
        }
      `}
    >
      <div className="mb-10 space-y-3 text-center">
        <h1 className="text-4xl font-bold text-green-800 md:text-4xl drop-shadow-md">
           Add New Plant
        </h1>
        <p className="max-w-2xl mx-auto text-base text-gray-400">
          Log every detail about your green friend so the Plant Care Tracker can
          remind you how to take the best care of it.
        </p>
      </div>

      <form onSubmit={handleAddPlant} className="space-y-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {[
            {
              label: "Image URL",
              name: "image",
              type: "text",
              placeholder: "Photo URL",
            },
            {
              label: "Plant Name",
              name: "plantName",
              type: "text",
              placeholder: "e.g., Snake Plant",
            },
            {
              label: "Watering Frequency",
              name: "wateringFrequency",
              type: "text",
              placeholder: "e.g., Every 3 days",
            },
            {
              label: "Health Status",
              name: "healthStatus",
              type: "text",
              placeholder: "e.g., Healthy / Needs attention",
            },
            {
              label: "Last Watered Date",
              name: "lastWateredDate",
              type: "date",
              className: dateInputStyle,
            },
            {
              label: "Next Watering Date",
              name: "nextWateringDate",
              type: "date",
              className: dateInputStyle,
            },
          ].map(
            ({ label, name, type, placeholder, className = inputStyle }) => (
              <fieldset
                key={name}
                className={`p-5 border rounded-lg shadow-inner
                ${
                  isDark
                    ? "bg-gray-800 border-gray-700"
                    : "bg-gray-50 border-gray-200"
                }
              `}
              >
                <label className={`block mb-2 font-semibold ${labelStyle}`}>
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  className={className}
                  placeholder={placeholder}
                  required
                />
              </fieldset>
            )
          )}

          {/* Category */}
          <fieldset
            className={`p-5 border rounded-lg shadow-inner
              ${
                isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              }`}
          >
            <label className={`block mb-2 font-semibold ${labelStyle}`}>
              Category
            </label>
            <select name="category" className={inputStyle} required>
              <option value="">Pick one</option>
              <option value="succulent">Succulent</option>
              <option value="fern">Fern</option>
              <option value="flowering">Flowering</option>
              <option value="bonsai">Bonsai</option>
            </select>
          </fieldset>

          {/* Care Level */}
          <fieldset
            className={`p-5 border rounded-lg shadow-inner
              ${
                isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              }`}
          >
            <label className={`block mb-2 font-semibold ${labelStyle}`}>
              Care Level
            </label>
            <select name="careLevel" className={inputStyle} required>
              <option value="">Pick one</option>
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="difficult">Difficult</option>
            </select>
          </fieldset>
        </div>

        {/* Description */}
        <fieldset
          className={`p-5 border rounded-lg shadow-inner
            ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-gray-50 border-gray-200"
            }`}
        >
          <label className={`block mb-2 font-semibold ${labelStyle}`}>
            Description
          </label>
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

        {/* Submit button */}
        <button
          type="submit"
          className="w-full py-3 text-lg font-semibold text-white transition-colors duration-300 bg-green-600 rounded-md shadow-md hover:bg-green-700"
        >
          Add Plant
        </button>
      </form>
    </div>
  );
};

export default AddPlant;
