import { Helmet } from "react-helmet-async";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

const UpdatePlant = () => {
  const {
    _id,
    plantName,
    category,
    careLevel,
    wateringFrequency,
    healthStatus,
    lastWateredDate,
    nextWateringDate,
    description,
  } = useLoaderData();

  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const updatedPlant = {
      plantName: form.plantName.value,
      category: form.category.value,
      careLevel: form.careLevel.value,
      wateringFrequency: form.wateringFrequency.value,
      healthStatus: form.healthStatus.value,
      lastWateredDate: form.lastWateredDate.value,
      nextWateringDate: form.nextWateringDate.value,
      description: form.description.value,
    };

    fetch(`https://mango-server-ten.vercel.app/mango/${_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPlant),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire("Updated!", "Plant updated successfully!", "success");
          navigate("/myPlants");
        }
      });
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Helmet>
        <title>Mango Grove Tracker | Update Plants</title>
      </Helmet>
      <div className="mb-6 space-y-5 text-center">
        <h1 className="text-4xl font-bold text-green-700 md:text-5xl">
          Update Plant
        </h1>
        <p className="max-w-2xl mx-auto text-sm text-gray-600 sm:text-base">
          Update details about your green companion to keep the tracker current.
        </p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <fieldset className="p-4 border rounded-lg bg-base-200 border-base-300">
            <label className="block mb-2 font-medium label">Plant Name</label>
            <input
              type="text"
              name="plantName"
              defaultValue={plantName}
              required
              className="w-full input input-bordered"
            />
          </fieldset>

          <fieldset className="p-4 border rounded-lg bg-base-200 border-base-300">
            <label className="block mb-2 font-medium label">Category</label>
            <select
              name="category"
              defaultValue={category}
              required
              className="w-full select select-bordered"
            >
              <option value="succulent">Succulent</option>
              <option value="fern">Fern</option>
              <option value="flowering">Flowering</option>
              <option value="bonsai">Bonsai</option>
            </select>
          </fieldset>

          <fieldset className="p-4 border rounded-lg bg-base-200 border-base-300">
            <label className="block mb-2 font-medium label">Care Level</label>
            <select
              name="careLevel"
              defaultValue={careLevel}
              required
              className="w-full select select-bordered"
            >
              <option value="easy">Easy</option>
              <option value="moderate">Moderate</option>
              <option value="difficult">Difficult</option>
            </select>
          </fieldset>

          <fieldset className="p-4 border rounded-lg bg-base-200 border-base-300">
            <label className="block mb-2 font-medium label">
              Watering Frequency
            </label>
            <input
              type="text"
              name="wateringFrequency"
              defaultValue={wateringFrequency}
              required
              className="w-full input input-bordered"
            />
          </fieldset>

          <fieldset className="p-4 border rounded-lg bg-base-200 border-base-300">
            <label className="block mb-2 font-medium label">Health Status</label>
            <input
              type="text"
              name="healthStatus"
              defaultValue={healthStatus}
              required
              className="w-full input input-bordered"
            />
          </fieldset>

          <fieldset className="p-4 border rounded-lg bg-base-200 border-base-300">
            <label className="block mb-2 font-medium label">
              Last Watered Date
            </label>
            <input
              type="date"
              name="lastWateredDate"
              defaultValue={lastWateredDate}
              required
              className="w-full input input-bordered"
            />
          </fieldset>

          <fieldset className="p-4 border rounded-lg bg-base-200 border-base-300">
            <label className="block mb-2 font-medium label">
              Next Watering Date
            </label>
            <input
              type="date"
              name="nextWateringDate"
              defaultValue={nextWateringDate}
              required
              className="w-full input input-bordered"
            />
          </fieldset>
        </div>

        <fieldset className="p-4 border rounded-lg bg-base-200 border-base-300">
          <label className="block mb-2 font-medium label">Description</label>
          <textarea
            name="description"
            defaultValue={description}
            rows="4"
            className="w-full textarea textarea-bordered"
          ></textarea>
        </fieldset>

        <input
          type="submit"
          value="Update Plant"
          className="w-full text-lg bg-green-600 lg:mb-16 btn"
        />
      </form>
    </div>
  );
};

export default UpdatePlant;

