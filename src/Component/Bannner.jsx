import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";

const slides = [
  {
    title: "Plant Care Tip 1",
    description: "Water your plants regularly but avoid overwatering.",
    image: "https://i.ibb.co/Xx01KF1C/premium-photo-1682094702641-0ae53d90f42d.jpg",
    cta: "View Watering Guide"
  },
  {
    title: "Popular Plant Varieties",
    description: "Discover beautiful succulents, ferns, and flowering plants.",
    image: "https://i.ibb.co/Txr6s149/premium-photo-1682094776766-199fd54814b5.jpg",
    cta: "Explore Plants"
  },
  {
    title: "Indoor Plants Benefits",
    description: "Improve air quality and mood with indoor greenery.",
    image: "https://i.ibb.co/0pQtKnkp/huy-phan-8gz-VQJstc-Qo-unsplash.jpg",
    cta: "Learn Benefits"
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
    <div className="relative  w-full h-[70vh] max-h-[800px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="absolute inset-0 z-0 w-full h-full"
        >
          <div
            className="w-full h-full bg-center bg-cover"
            style={{ backgroundImage: `url(${slides[current].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute z-10 flex items-center justify-start h-full px-8 md:px-24 lg:px-32">
        <motion.div
          key={current}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            duration: 1, 
            delay: 0.4,
            ease: [0.43, 0.13, 0.23, 0.96]
          }}
          className="max-w-2xl space-y-6 text-white"
        >
          <motion.h1 
            className="text-4xl font-extrabold leading-tight md:text-6xl lg:text-7xl drop-shadow-2xl"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.6 }}
          >
            {slides[current].title}
          </motion.h1>
          
          <motion.p 
            className="text-lg font-light md:text-xl lg:text-2xl drop-shadow-lg max-w-[80%]"
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.8 }}
          >
            {slides[current].description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <Link to={"/allPlants"}>
            <button className="px-8 py-3 mt-4 text-base font-semibold transition-all duration-300 rounded-full shadow-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-105 hover:shadow-2xl">
              {slides[current].cta}
              <span className="ml-2">→</span>
            </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>


      <div className="absolute left-0 right-0 z-10 flex justify-center gap-2 bottom-8">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === index ? "bg-white w-6" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <button 
        onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute z-10 p-2 text-white transition-all -translate-y-1/2 rounded-full left-4 md:left-8 top-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button 
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        className="absolute z-10 p-2 text-white transition-all -translate-y-1/2 rounded-full right-4 md:right-8 top-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Banner;