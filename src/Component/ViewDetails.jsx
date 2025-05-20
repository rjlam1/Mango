
import { useLoaderData } from "react-router";

const ViewDetails = () => {
  const plant = useLoaderData();

  return (
    <div className="max-w-5xl p-6 mx-auto">
      <div className="flex flex-col overflow-hidden bg-white border border-gray-200 shadow-2xl lg:flex-row rounded-2xl">
        <figure className="relative flex-shrink-0 w-full lg:w-96 h-96">
          <img
            src={plant?.image}
            alt={plant.plantName}
            className="object-cover w-full h-full rounded-l-2xl"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <h1 className="text-2xl font-extrabold text-white drop-shadow-lg">{plant.plantName}</h1>
          </div>
        </figure>

        <div className="flex flex-col justify-center p-8 space-y-4 bg-gray-50 lg:bg-white">
          <InfoItem label="Category" value={plant.category} />
          <InfoItem label="Care Level" value={plant.careLevel} />
          <InfoItem label="Watering Frequency" value={plant.wateringFrequency} />
          <InfoItem label="Health Status" value={plant.healthStatus} />
          <InfoItem label="Last Watered" value={plant.lastWateredDate} />
          <InfoItem label="Next Watering" value={plant.nextWateringDate} />
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-700">Description</h3>
            <p className="leading-relaxed text-gray-600">{plant.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="flex items-center gap-3">
    <span className="w-40 font-semibold text-gray-800">{label}:</span>
    <span className="text-gray-600">{value}</span>
  </div>
);

export default ViewDetails;
