import React, { useContext } from 'react';
import { ThemeContext } from './Theme';

const AboutUs = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section
      className={`max-w-8xl mx-auto px-4 py-12 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'
      }`}
    >
      <h1 className={`text-4xl font-bold mb-6 text-center ${theme === 'dark' ? 'text-green-800' : 'text-green-800'}`}>
        About Us
      </h1>
      <p className="mb-6 text-lg leading-relaxed">
        Welcome to Plant Care Tracker — your digital companion for nurturing healthy and happy plants. 
        We are passionate plant lovers dedicated to helping you care for your indoor and outdoor plants with ease.
      </p>
      <p className="mb-6 text-lg leading-relaxed">
        Our mission is to provide you with an intuitive and beautiful platform to track watering, fertilizing, and monitor your plants’ health so that your green friends thrive all year round.
      </p>
      <p className="mb-6 text-lg leading-relaxed">
        Whether you’re a beginner or an expert gardener, our app offers personalized tools and reminders tailored to your plants’ unique needs. Join our community and let’s grow together!
      </p>
      <h2 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-green-800' : 'text-green-800'}`}>
        Our Team
      </h2>
      <ul className="list-disc list-inside">
        <li>Shafiul Islam Lam - Founder & Developer</li>
        <li>Jane Doe - UX Designer</li>
        <li>John Smith - Content Specialist</li>
      </ul>
    </section>
  );
};

export default AboutUs;
