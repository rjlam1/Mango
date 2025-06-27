import { Link, useLoaderData } from "react-router";
import { ThemeContext } from "./Theme";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";

const ViewDetails = () => {
  const plant = useLoaderData();
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  if (!plant) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
        <div className="text-center">
          <p className={`text-xl ${isDark ? "text-gray-300" : "text-gray-600"}`}>Plant not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen py-6 px-4 sm:px-6 lg:px-4 ${isDark ? "bg-gray-900" : "bg-gray-50"}`}>
      <Helmet>
        <title>{`Mango Grove Tracker | ${plant.plantName}`}</title>
      </Helmet>
      
      <div className={`max-w-8xl mx-auto transition-all duration-300 ${isDark ? "text-gray-100" : "text-gray-800"}`}>
       
        <div className="mb-5">
          <Link
            to="/allPlants" 
            className={`inline-flex items-center px-4 py-2 rounded-lg ${isDark ? "bg-gray-700 hover:bg-gray-600 text-white" : "bg-white hover:bg-gray-100 text-gray-800"} shadow transition-colors`}
          >
            ← Back to All Plants
          </Link>
        </div>

        <div className={`overflow-hidden rounded-xl shadow-2xl ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border`}>
          <div className="flex flex-col lg:flex-row">
          
            <div className="relative lg:w-1/2">
              {plant.image ? (
                <img
                  src={plant.image}
                  alt={plant.plantName}
                  className="object-cover w-full h-full min-h-96 lg:min-h-[32rem]"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/600x400?text=Plant+Image";
                  }}
                />
              ) : (
                <div className="w-full h-96 lg:h-[32rem] bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h1 className="text-3xl font-bold text-white md:text-4xl drop-shadow-lg">
                  {plant.plantName}
                </h1>
                <div className={`mt-2 px-3 py-1 rounded-full inline-block ${getHealthStatusColor(plant.healthStatus, isDark)}`}>
                  {plant.healthStatus || "Status unknown"}
                </div>
              </div>
            </div>

        
            <div className={`lg:w-1/2 p-6 md:p-8 ${isDark ? "bg-gray-800" : "bg-white"}`}>
              <div className="space-y-6">
          
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <InfoItem 
                    label="Category" 
                    value={plant.category || "Not specified"} 
                    isDark={isDark} 
                    icon="🌿" 
                  />
                  <InfoItem 
                    label="Care Level" 
                    value={plant.careLevel || "Not specified"} 
                    isDark={isDark} 
                    icon="💧" 
                    valueClassName={getCareLevelColor(plant.careLevel, isDark)}
                  />
                  <InfoItem 
                    label="Watering Frequency" 
                    value={plant.wateringFrequency || "Not specified"} 
                    isDark={isDark} 
                    icon="⏱️" 
                  />
                  <InfoItem 
                    label="Last Watered" 
                    value={formatDate(plant.lastWateredDate)} 
                    isDark={isDark} 
                    icon="📅" 
                  />
                  <InfoItem 
                    label="Next Watering" 
                    value={formatDate(plant.nextWateringDate)} 
                    isDark={isDark} 
                    icon="⏳" 
                  />
                  <div className={`p-3 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
                    <span className={`font-medium ${isDark ? "text-gray-300" : "text-gray-600"}`}>Health Status:</span>
                    <span className={`ml-2 font-semibold ${getHealthStatusTextColor(plant.healthStatus, isDark)}`}>
                      {plant.healthStatus || "Not specified"}
                    </span>
                  </div>
                </div>

                {plant.description && (
                  <div className="pt-4 border-t border-gray-700">
                    <h3 className={`text-xl font-semibold mb-4 ${isDark ? "text-gray-200" : "text-gray-700"}`}>
                      Description
                    </h3>
                    <p className={`leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      {plant.description}
                    </p>
                  </div>
                )}

               
                <div className={`p-4 rounded-lg ${isDark ? "bg-gray-700/50" : "bg-green-50"}`}>
                  <h4 className={`font-semibold mb-2 flex items-center ${isDark ? "text-green-400" : "text-green-700"}`}>
                    <span className="mr-2">💡</span> Care Tips
                  </h4>
                  <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    {getCareTips(plant.careLevel)}
                  </p>
                </div>

            
                {plant.notes && (
                  <div className={`p-4 rounded-lg ${isDark ? "bg-gray-700/50" : "bg-blue-50"}`}>
                    <h4 className={`font-semibold mb-2 flex items-center ${isDark ? "text-blue-400" : "text-blue-700"}`}>
                      <span className="mr-2">📝</span> Additional Notes
                    </h4>
                    <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                      {plant.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value, isDark, icon, valueClassName = "" }) => (
  <div className={`p-3 rounded-lg ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
    <div className="flex items-center">
      {icon && <span className="mr-2">{icon}</span>}
      <div>
        <div className={`text-sm font-medium ${isDark ? "text-gray-400" : "text-gray-500"}`}>
          {label}
        </div>
        <div className={`font-semibold ${valueClassName || (isDark ? "text-gray-200" : "text-gray-800")}`}>
          {value}
        </div>
      </div>
    </div>
  </div>
);

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

const getCareLevelColor = (level, isDark) => {
  switch (level?.toLowerCase()) {
    case 'easy':
      return isDark ? "text-green-400" : "text-green-600";
    case 'moderate':
      return isDark ? "text-yellow-400" : "text-yellow-600";
    case 'difficult':
      return isDark ? "text-red-400" : "text-red-600";
    default:
      return isDark ? "text-gray-400" : "text-gray-600";
  }
};

const getCareTips = (careLevel) => {
  switch (careLevel?.toLowerCase()) {
    case 'easy':
      return "This plant is low maintenance. Water when soil is dry and provide indirect sunlight. Perfect for beginners!";
    case 'moderate':
      return "This plant requires regular care. Maintain consistent watering, provide appropriate light conditions, and fertilize monthly during growing season.";
    case 'difficult':
      return "This plant needs expert care. Monitor closely, maintain specific humidity and temperature conditions, and may require special soil or fertilizers.";
    default:
      return "General care tips: Water when top inch of soil is dry, provide adequate sunlight based on plant type, and watch for signs of pests or disease.";
  }
};

export default ViewDetails;