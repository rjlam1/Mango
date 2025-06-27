import React, { useState, useEffect, useContext } from 'react';
import { FiBox, FiUser, FiTag, FiActivity } from 'react-icons/fi';
import { AuthContext } from '../../PrivateRouter/AuthPrivate';
import { ThemeContext } from '../Theme';

const DashboardOverview = () => {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext); 

  const [totalItems, setTotalItems] = useState(0);
  const [myItemsCount, setMyItemsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalResponse = await fetch('https://mango-server-ten.vercel.app/mango');
        if (!totalResponse.ok) throw new Error('Failed to fetch total items');
        const totalData = await totalResponse.json();
        setTotalItems(totalData.length);

        if (user) {
          const myItemsResponse = await fetch('https://mango-server-ten.vercel.app/mango');
          if (!myItemsResponse.ok) throw new Error('Failed to fetch my items');
          const myData = await myItemsResponse.json();
          const userItems = myData.filter(item => item.userEmail === user.email);
          setMyItemsCount(userItems.length);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const stats = [
    { title: "Total Items", value: totalItems, icon: <FiBox />, trend: "↑ 12%", color: "blue" },
    { title: "My Items", value: myItemsCount, icon: <FiUser />, trend: "↑ 5%", color: "green" },
    { title: "Categories", value: 8, icon: <FiTag />, trend: "→", color: "purple" },
    { title: "Activity", value: 36, icon: <FiActivity />, trend: "↓ 3%", color: "orange" }
  ];

  if (error) return <p className="text-red-500 dark:text-red-400">Error: {error}</p>;

  return (
    <div>
      
<h1 className={`mb-8 text-2xl font-bold ${
  theme === 'dark' ? 'text-white' : 'text-gray-800'
}`}>
  Dashboard Overview
</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl shadow border-t-4 transition-colors duration-300
              ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
              ${
                stat.color === 'blue' ? 'border-blue-500' :
                stat.color === 'green' ? 'border-green-500' :
                stat.color === 'purple' ? 'border-purple-500' : 'border-orange-500'
              }`}
          >
            <div className="flex justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-300">{stat.title}</p>
                <p className="mt-2 text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full
                ${
                  stat.color === 'blue' ? 'bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-200' :
                  stat.color === 'green' ? 'bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-200' :
                  stat.color === 'purple' ? 'bg-purple-100 text-purple-600 dark:bg-purple-800 dark:text-purple-200' :
                  'bg-orange-100 text-orange-600 dark:bg-orange-800 dark:text-orange-200'
                }`}
              >
                {stat.icon}
              </div>
            </div>
            <p className={`text-sm mt-4 font-medium
              ${
                stat.color === 'blue' ? 'text-blue-600 dark:text-blue-300' :
                stat.color === 'green' ? 'text-green-600 dark:text-green-300' :
                stat.color === 'purple' ? 'text-purple-600 dark:text-purple-300' :
                'text-orange-600 dark:text-orange-300'
              }`}
            >
              {stat.trend} from last week
            </p>
          </div>
        ))}
      </div>

      
      {user && (
        <div className={`p-6 mb-8 rounded-xl shadow transition-colors duration-300
          ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
          <h2 className="mb-4 text-xl font-semibold">Logged-in User Information</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Name:</span> {user.displayName || "N/A"}</p>
            <p><span className="font-medium">Email:</span> {user.email}</p>
            {user.photoURL && (
              <p>
                <span className="font-medium">Profile Picture:</span>
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="inline-block w-16 h-16 ml-2 rounded-full"
                />
              </p>
            )}
          </div>
        </div>
      )}

     
      <div className={`p-6 rounded-xl shadow transition-colors duration-300
        ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <h2 className="mb-4 text-xl font-semibold">Recent Activity</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-start">
              <div className="p-2 mr-4 bg-blue-100 rounded-full dark:bg-blue-800">
                <FiUser className="text-blue-600 dark:text-blue-300" />
              </div>
              <div>
                <p className="font-medium">New item added</p>
                <p className="text-sm text-gray-500 dark:text-gray-300">Mango Plant #{item}</p>
                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
