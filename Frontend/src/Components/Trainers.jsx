import React from "react";
import { motion } from "framer-motion";
import Arish2 from "../assets/Arish2.jpg";
import ArishVideo from "../assets/Video1.mp4";

// Section entrance animation
const sectionVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      staggerChildren: 0.2,
    },
  },
};

// Card‑like media animation
const mediaVariants = {
  hidden: { opacity: 0, scale: 0.9, rotateY: -10 },
  visible: { opacity: 1, scale: 1, rotateY: 0 },
  hover: { scale: 1.05, rotateY: 1.5 },
};

const trainer = {
  name: "Aarish Barudawale",
  img: Arish2,
  desc: "Certified Trainer · 15+ Years Transforming Lives",
};

const Trainers = () => (
  <motion.section
    className="bg-black text-white px-5 py-14 md:px-20 overflow-hidden"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
  >
    {/* Title */}
    <motion.h2
      className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold text-orange-500 mb-6 drop-shadow-lg tracking-wide animate-pulse"
      variants={mediaVariants}
      initial="hidden"
      whileInView="visible"
      transition={{ type: "spring", stiffness: 200 }}
    >
      Tiger Gym Coach
    </motion.h2>

    {/* Coach Name & Description */}
    <motion.div className="text-center mb-8" variants={mediaVariants}>
      <motion.h3
        className="inline-block text-2xl sm:text-3xl font-bold text-white hover:text-orange-400 transition-transform duration-300"
        whileHover={{ scale: 1.1, rotate: 1 }}
        whileTap={{ scale: 1.05 }}
      >
        {trainer.name}
      </motion.h3>
      <motion.p
        className="mt-1 text-base sm:text-lg text-gray-300 max-w-md mx-auto"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {trainer.desc}
      </motion.p>
    </motion.div>

    {/* Media: image first on all screens */}
    <div className="flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto">
      {/* IMAGE */}
      <motion.div
        className="group relative w-full md:w-1/2 cursor-pointer"
        variants={mediaVariants}
        whileHover="hover"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-500/30 to-red-600/20 blur-lg opacity-60 group-hover:opacity-80 transition" />
        <motion.img
          src={trainer.img}
          alt="Tiger Coach"
          className="relative w-full h-72 sm:h-80 md:h-[26rem] object-cover object-top rounded-2xl shadow-2xl"
          variants={mediaVariants}
        />
      </motion.div>

      {/* VIDEO */}
      <motion.div
        className="group relative w-full md:w-1/2 cursor-pointer"
        variants={mediaVariants}
        whileHover="hover"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-600/20 to-orange-600/30 blur-lg opacity-60 group-hover:opacity-80 transition" />
        <motion.video
          src={ArishVideo}
          autoPlay
          muted
          loop
          playsInline
          controls
          className="relative w-full h-72 sm:h-80 md:h-[26rem] object-cover rounded-2xl shadow-2xl"
          variants={mediaVariants}
        />
      </motion.div>
    </div>
  </motion.section>
);

export default Trainers;