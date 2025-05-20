

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    title: "Plant Care Tip 1",
    description: "Water your plants regularly but avoid overwatering.",
    image: "https://i.ibb.co/Xx01KF1C/premium-photo-1682094702641-0ae53d90f42d.jpg",
  },
  {
    title: "Popular Plant Varieties",
    description: "Discover beautiful succulents, ferns, and flowering plants.",
    image: "https://source.unsplash.com/1600x600/?succulent,flower",
  },
  {
    title: "Indoor Plants Benefits",
    description: "Improve air quality and mood with indoor greenery.",
    image: "https://source.unsplash.com/1600x600/?indoor,plants",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[90vh] max-h-[600px] overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0 w-full h-full"
        >
          <div
            className="w-full h-full bg-center bg-cover"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent backdrop-blur-sm" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute z-10 flex items-center justify-start h-full px-6 md:px-16">
        <motion.div
          key={current}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="max-w-xl space-y-4 text-white"
        >
          <h1 className="text-3xl font-extrabold leading-tight md:text-5xl drop-shadow-xl">
            {slides[current].title}
          </h1>
          <p className="text-base font-light md:text-lg drop-shadow-md">
            {slides[current].description}
          </p>
          <button className="px-6 py-2 mt-2 text-sm font-semibold transition-all duration-300 bg-green-500 rounded-full shadow-lg hover:bg-green-600 hover:scale-105">
            Learn More
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;
