import React, { useContext } from "react";
import { ThemeContext } from "./Theme"; 

const AISection = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section
      className={`${
        theme === "dark"
          ? "bg-gray-900"
          : "bg-gradient-to-b from-gray-50 to-gray-100"
      } py-12 md:py-16 px-4 sm:px-6 transition-colors duration-300`}
    >
      <div className="px-4 mx-auto max-w-8xl sm:px-6 lg:px-0">
        <div className="flex flex-col items-stretch gap-8 lg:gap-12 xl:gap-16 lg:flex-row">
         
          <div className="w-full lg:w-1/2">
            <div
              className={`${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } p-2 rounded-full w-max mb-4 sm:mb-6`}
            >
              <span
                className={`${
                  theme === "dark"
                    ? "bg-green-900 text-green-300"
                    : "bg-green-100 text-green-800"
                } text-xs sm:text-sm font-medium px-3 sm:px-4 py-1 sm:py-2 rounded-full`}
              >
                AI Powered
              </span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              } mb-4 sm:mb-6`}
            >
              Your Personal{" "}
              <span className="text-green-600">Plant Care Assistant</span>
            </h2>
            <p
              className={`text-base sm:text-lg ${
                theme === "dark" ? "text-gray-300" : "text-gray-600"
              } mb-6 sm:mb-8`}
            >
              Our advanced AI analyzes your plants' needs and provides
              personalized care recommendations, watering schedules, and
              troubleshooting advice.
            </p>

            <div className="space-y-3 sm:space-y-4">
              {[
                {
                  title: "Smart Diagnosis",
                  desc: "Upload photos to identify plant issues and get solutions",
                  icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                },
                {
                  title: "Custom Schedules",
                  desc: "Personalized watering and fertilizing plans",
                  icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
                },
                {
                  title: "Instant Answers",
                  desc: "24/7 plant care advice at your fingertips",
                  icon: "M13 10V3L4 14h7v7l9-11h-7z",
                },
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4">
                  <div
                    className={`${
                      theme === "dark" ? "bg-green-900" : "bg-green-100"
                    } p-1.5 sm:p-2 rounded-lg`}
                  >
                    <svg
                      className="w-5 h-5 text-green-600 sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={feature.icon}
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3
                      className={`text-sm sm:text-base font-semibold ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        
          <div className="relative w-full mt-6 lg:mt-0 lg:w-1/2">
            <div
              className={`${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              } p-4 sm:p-6 rounded-2xl shadow-xl border transition-colors duration-300`}
            >
              <div
                className={`${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                } rounded-lg p-3 sm:p-4 mb-4 sm:mb-6`}
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-full sm:w-10 sm:h-10">
                    <svg
                      className="w-4 h-4 text-white sm:w-6 sm:h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3
                      className={`text-sm sm:text-base font-medium ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Plant Assistant
                    </h3>
                    <p
                      className={`text-xs sm:text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      AI Bot
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-4 space-y-3 sm:mb-6 sm:space-y-4">
                <div
                  className={`${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                  } p-3 sm:p-4 rounded-lg w-full sm:max-w-xs`}
                >
                  <p
                    className={`text-xs sm:text-sm ${
                      theme === "dark" ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    Hi there! I see your Monstera has some yellow leaves. Would
                    you like help diagnosing the issue?
                  </p>
                </div>
                <div className="flex justify-end">
                  <div className="w-full p-3 text-white bg-green-600 rounded-lg sm:max-w-xs sm:p-4">
                    <p className="text-xs sm:text-sm">
                      Yes please! Here's a photo of my plant.
                    </p>
                  </div>
                </div>
                <div
                  className={`${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                  } p-3 sm:p-4 rounded-lg w-full sm:max-w-xs`}
                >
                  <p
                    className={`text-xs sm:text-sm ${
                      theme === "dark" ? "text-gray-200" : "text-gray-800"
                    }`}
                  >
                    Thanks! Based on the image, this looks like overwatering.
                    Let me create a customized care plan for you...
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center gap-2 pt-3 sm:pt-4 border-t ${
                  theme === "dark" ? "border-gray-700" : "border-gray-200"
                }`}
              >
                <input
                  type="text"
                  placeholder="Ask about your plants..."
                  className={`flex-1 min-w-0 rounded-full px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    theme === "dark"
                      ? "bg-gray-700 text-white"
                      : "bg-gray-100 text-gray-800"
                  }`}
                />
                <button className="p-2 text-white bg-green-600 rounded-full">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="absolute z-0 w-24 h-24 bg-green-600 rounded-full sm:w-32 sm:h-32 -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 opacity-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;