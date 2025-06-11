import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
  offscreen: {
    y: 100,
    opacity: 0,
    scale: 0.8,
    rotate: -5,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const Feature = () => {
  return (
    <motion.div
      className="bg-black text-white py-10 px-6 md:px-20"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        className="text-3xl font-bold text-center mb-8 text-orange-600 animate-pulse transition-all duration-300"
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        Why Choose Us?
      </motion.h2>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            icon: "🏋️‍♂️",
            title: "Professional Trainers",
            desc: "Get personalized training from certified fitness experts.",
          },
          {
            icon: "💪",
            title: "Modern Equipment",
            desc: "We provide the latest gym equipment for effective workouts.",
          },
          {
            icon: "🗓️",
            title: "Flexible Schedules",
            desc: "Choose a workout schedule that fits your lifestyle.",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:scale-110 transition duration-500 cursor-pointer"
            variants={cardVariants}
            transition={{ delay: index * 0.2 }}
          >
            <motion.div
              className="text-4xl mb-4"
              whileHover={{ rotate: 360, scale: 1.3 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {item.icon}
            </motion.div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Feature;
