import { useLoaderData } from "react-router";
import { ThemeContext } from "./Theme";
import { useContext } from "react";

const ViewDetails = () => {
  const plant = useLoaderData();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div className={`max-w-5xl p-6 mx-auto ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      <div className={`flex flex-col overflow-hidden border shadow-2xl lg:flex-row rounded-2xl ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
        {/* Image Section */}
        <figure className="relative flex-shrink-0 w-full lg:w-96 h-96">
          <img
            src={plant?.image}
            alt={plant.plantName}
            className="object-cover w-full h-full rounded-l-2xl"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
            <h1 className="text-2xl font-extrabold text-white drop-shadow-lg">
              {plant.plantName}
            </h1>
          </div>
        </figure>

        {/* Details Section */}
        <div className={`flex flex-col justify-center p-8 space-y-4 ${isDark ? "bg-gray-900" : "bg-gray-50"} lg:flex-1`}>
          <InfoItem label="Category" value={plant.category} isDark={isDark} />
          <InfoItem label="Care Level" value={plant.careLevel} isDark={isDark} />
          <InfoItem label="Watering Frequency" value={plant.wateringFrequency} isDark={isDark} />
          <InfoItem label="Health Status" value={plant.healthStatus} isDark={isDark} />
          <InfoItem label="Last Watered" value={plant.lastWateredDate} isDark={isDark} />
          <InfoItem label="Next Watering" value={plant.nextWateringDate} isDark={isDark} />
          <div>
            <h3 className={`mb-2 text-lg font-semibold ${isDark ? "text-gray-200" : "text-gray-700"}`}>
              Description
            </h3>
            <p className={`${isDark ? "text-gray-300" : "text-gray-600"} leading-relaxed`}>
              {plant.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Subcomponent to render each info row
const InfoItem = ({ label, value, isDark }) => (
  <div className="flex items-center gap-3">
    <span className={`w-40 font-semibold ${isDark ? "text-gray-300" : "text-gray-800"}`}>{label}:</span>
    <span className={`${isDark ? "text-gray-200" : "text-gray-600"}`}>{value}</span>
  </div>
);

export default ViewDetails;
