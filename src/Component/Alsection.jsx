import { useContext } from "react";
import { ThemeContext } from "./Theme";

const AISection = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section className={`${theme === 'dark' ? 'bg-gray-900' : 'bg-gradient-to-b from-gray-50 to-gray-100'} py-16 px-4 transition-colors duration-300`}>
      <div className="px-2 mx-auto max-w-8xl">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          {/* Left Content */}
          <div className="lg:w-1/2">
            <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} p-2 rounded-full w-max mb-6`}>
              <span className={`${theme === 'dark' ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'} text-sm font-medium px-4 py-2 rounded-full`}>
                AI Powered
              </span>
            </div>
            <h2 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>
              Your Personal <span className="text-green-600">Plant Care Assistant</span>
            </h2>
            <p className={`text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
              Our advanced AI analyzes your plants' needs and provides personalized care recommendations, watering schedules, and troubleshooting advice.
            </p>
            
            
            <div className="space-y-4">
              {[
                {
                  title: "Smart Diagnosis",
                  desc: "Upload photos to identify plant issues and get solutions",
                  icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                },
                {
                  title: "Custom Schedules",
                  desc: "Personalized watering and fertilizing plans",
                  icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                },
                {
                  title: "Instant Answers",
                  desc: "24/7 plant care advice at your fingertips",
                  icon: "M13 10V3L4 14h7v7l9-11h-7z"
                }
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`${theme === 'dark' ? 'bg-green-900' : 'bg-green-100'} p-2 rounded-lg`}>
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon}></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {feature.title}
                    </h3>
                    <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:w-1/2">
            <div className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} p-8 rounded-2xl shadow-xl border transition-colors duration-300`}>
          
              <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg p-4 mb-6`}>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 bg-green-600 rounded-full">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Plant Assistant</h3>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>AI Bot</p>
                  </div>
                </div>
              </div>
              
           
              <div className="mb-6 space-y-4">
                <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg max-w-xs`}>
                  <p className={theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}>
                    Hi there! I see your Monstera has some yellow leaves. Would you like help diagnosing the issue?
                  </p>
                </div>
                <div className="flex justify-end">
                  <div className="max-w-xs p-4 text-white bg-green-600 rounded-lg">
                    <p>Yes please! Here's a photo of my plant.</p>
                  </div>
                </div>
                <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'} p-4 rounded-lg max-w-xs`}>
                  <p className={theme === 'dark' ? 'text-gray-200' : 'text-gray-800'}>
                    Thanks! Based on the image, this looks like overwatering. Let me create a customized care plan for you...
                  </p>
                </div>
              </div>
              
          
              <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                <input 
                  type="text" 
                  placeholder="Ask about your plants..." 
                  className={`flex-1 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                    theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-100'
                  }`}
                />
                <button className="p-2 text-white bg-green-600 rounded-full">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="absolute z-0 w-32 h-32 bg-green-600 rounded-full -bottom-6 -right-6 opacity-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;


