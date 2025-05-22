// import { useLoaderData } from "react-router";
// import { ThemeContext } from "./Theme";
// import { useContext } from "react";

// const ViewDetails = () => {
//   const plant = useLoaderData();
//   const { theme } = useContext(ThemeContext);
//   const isDark = theme === "dark";

//   return (
//     <div className={`max-w-5xl p-6 mx-auto ${isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
//       <div className={`flex flex-col overflow-hidden border shadow-2xl lg:flex-row rounded-2xl ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}>
//         {/* Image Section */}
//         <figure className="relative flex-shrink-0 w-full lg:w-96 h-96">
//           <img
//             src={plant?.image}
//             alt={plant.plantName}
//             className="object-cover w-full h-full rounded-l-2xl"
//           />
//           <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
//             <h1 className="text-2xl font-extrabold text-white drop-shadow-lg">
//               {plant.plantName}
//             </h1>
//           </div>
//         </figure>

//         {/* Details Section */}
//         <div className={`flex flex-col justify-center p-8 space-y-4 ${isDark ? "bg-gray-900" : "bg-gray-50"} lg:flex-1`}>
//           <InfoItem label="Category" value={plant.category} isDark={isDark} />
//           <InfoItem label="Care Level" value={plant.careLevel} isDark={isDark} />
//           <InfoItem label="Watering Frequency" value={plant.wateringFrequency} isDark={isDark} />
//           <InfoItem label="Health Status" value={plant.healthStatus} isDark={isDark} />
//           <InfoItem label="Last Watered" value={plant.lastWateredDate} isDark={isDark} />
//           <InfoItem label="Next Watering" value={plant.nextWateringDate} isDark={isDark} />
//           <div>
//             <h3 className={`mb-2 text-lg font-semibold ${isDark ? "text-gray-200" : "text-gray-700"}`}>
//               Description
//             </h3>
//             <p className={`${isDark ? "text-gray-300" : "text-gray-600"} leading-relaxed`}>
//               {plant.description}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Subcomponent to render each info row
// const InfoItem = ({ label, value, isDark }) => (
//   <div className="flex items-center gap-3">
//     <span className={`w-40 font-semibold ${isDark ? "text-gray-300" : "text-gray-800"}`}>{label}:</span>
//     <span className={`${isDark ? "text-gray-200" : "text-gray-600"}`}>{value}</span>
//   </div>
// );

// export default ViewDetails;
import { useLoaderData } from "react-router";
import { ThemeContext } from "./Theme";
import { useContext } from "react";

const ViewDetails = () => {
  const plant = useLoaderData();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <div className={`max-w-6xl mx-auto transition-all duration-300 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
        {/* Main Card Container */}
        <div className={`overflow-hidden rounded-xl shadow-2xl ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border`}>
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="relative lg:w-1/2">
              <img
                src={plant?.image}
                alt={plant.plantName}
                className="object-cover w-full h-full min-h-96 lg:min-h-[32rem]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                  {plant.plantName}
                </h1>
                <div className={`mt-2 px-3 py-1 rounded-full inline-block ${getHealthStatusColor(plant.healthStatus, isDark)}`}>
                  {plant.healthStatus}
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className={`lg:w-1/2 p-8 ${isDark ? "bg-gray-800" : "bg-white"}`}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <InfoItem label="Category" value={plant.category} isDark={isDark} icon="🌿" />
                  <InfoItem label="Care Level" value={plant.careLevel} isDark={isDark} icon="💧" />
                  <InfoItem label="Watering Frequency" value={plant.wateringFrequency} isDark={isDark} icon="⏱️" />
                  <InfoItem label="Last Watered" value={formatDate(plant.lastWateredDate)} isDark={isDark} icon="📅" />
                  <InfoItem label="Next Watering" value={formatDate(plant.nextWateringDate)} isDark={isDark} icon="⏳" />
                  <div className={`p-3 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                    <span className={`font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>Health Status:</span>
                    <span className={`ml-2 font-semibold ${getHealthStatusTextColor(plant.healthStatus, isDark)}`}>
                      {plant.healthStatus}
                    </span>
                  </div>
                </div>

                {/* Description Section */}
                <div className="pt-4 border-t border-gray-700">
                  <h3 className={`text-xl font-semibold mb-4 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                    Description
                  </h3>
                  <p className={`leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    {plant.description}
                  </p>
                </div>

                {/* Care Tips (Optional) */}
                <div className={`p-4 rounded-lg ${isDark ? "bg-gray-700/50" : "bg-green-50"}`}>
                  <h4 className={`font-semibold mb-2 flex items-center ${isDark ? "text-green-400" : "text-green-700"}`}>
                    <span className="mr-2">💡</span> Care Tips
                  </h4>
                  <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    {getCareTips(plant.careLevel)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced InfoItem component with icon support
const InfoItem = ({ label, value, isDark, icon }) => (
  <div className={`p-3 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
    <div className="flex items-center">
      {icon && <span className="mr-2">{icon}</span>}
      <div>
        <div className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>{label}</div>
        <div className={`font-semibold ${isDark ? "text-gray-200" : "text-gray-800"}`}>{value}</div>
      </div>
    </div>
  </div>
);

// Helper functions
const formatDate = (dateString) => {
  if (!dateString) return "Not set";
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const getHealthStatusColor = (status, isDark) => {
  switch (status?.toLowerCase()) {
    case 'healthy':
      return isDark ? "bg-green-900/80 text-green-300" : "bg-green-100 text-green-800";
    case 'needs attention':
      return isDark ? "bg-yellow-900/80 text-yellow-300" : "bg-yellow-100 text-yellow-800";
    case 'critical':
      return isDark ? "bg-red-900/80 text-red-300" : "bg-red-100 text-red-800";
    default:
      return isDark ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-800";
  }
};

const getHealthStatusTextColor = (status, isDark) => {
  switch (status?.toLowerCase()) {
    case 'healthy':
      return isDark ? "text-green-400" : "text-green-600";
    case 'needs attention':
      return isDark ? "text-yellow-400" : "text-yellow-600";
    case 'critical':
      return isDark ? "text-red-400" : "text-red-600";
    default:
      return isDark ? "text-gray-400" : "text-gray-600";
  }
};

const getCareTips = (careLevel) => {
  switch (careLevel?.toLowerCase()) {
    case 'easy':
      return "This plant is low maintenance. Water when soil is dry and provide indirect sunlight.";
    case 'moderate':
      return "This plant requires regular care. Maintain consistent watering and provide appropriate light conditions.";
    case 'difficult':
      return "This plant needs expert care. Monitor closely, maintain specific humidity and temperature conditions.";
    default:
      return "Check specific care requirements for this plant species.";
  }
};

export default ViewDetails;