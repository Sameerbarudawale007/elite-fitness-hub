import React from "react";
import Arish from "../assets/Arish.jpg";
import Afzal from "../assets/Afzal.jpg";
import Juned from "../assets/Juned.jpg";
import { motion } from "framer-motion";

const trainerVariants = {
  offscreen: {
    y: 100,
    opacity: 0,
    scale: 0.9,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      bounce: 0.3,
      duration: 0.8,
    },
  },
};

const Trainers = () => {
  const trainerData = [
    {
      name: "Aarish Barudawale",
      img: Arish,
      desc: "Certified Trainer | 15 Years of Trusted Expertise in Professional Coaching",
    },
    {
      name: "Afzal Barudawale",
      img: Afzal,
      desc: "Dedicated Trainer with 4 Years of Hands-On Experience in Delivering Real Results",
    },
    {
      name: "Juned Mulla",
      img: Juned,
      desc: "Trusted Trainer Backed by 4 Years of Practical Coaching Excellence",
    },
  ];

  return (
    <motion.div
      className="bg-black text-white py-10 px-6 md:px-20"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        className="text-2xl font-bold text-center mb-4 text-orange-600 animate-pulse"
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        Meet Our Trainers💪
      </motion.h2>
      <motion.h4
        className="text-1xl font-bold text-center mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Our trainers are here to dedicate the time and efforts that you need to
        get in the best shape of your life.
      </motion.h4>

      <div className="grid md:grid-cols-3 gap-8">
        {trainerData.map((trainer, index) => (
          <motion.div
            key={index}
            className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center cursor-pointer hover:scale-105 transition duration-300"
            variants={trainerVariants}
            transition={{ delay: index * 0.2 }}
          >
            <motion.img
              className="h-72 w-full object-cover rounded-2xl hover:scale-110 transition duration-500"
              src={trainer.img}
              alt={trainer.name}
              whileHover={{ rotate: 2 }}
            />
            <motion.h3
              className="text-xl font-semibold mb-2 mt-4 text-orange-500"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{
                scale: 1.05,
                color: "#facc15", // Tailwind's yellow-400
                textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)",
              }}
            >
              {trainer.name}
            </motion.h3>
            <motion.p
              className="text-base text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {trainer.desc}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Trainers;
