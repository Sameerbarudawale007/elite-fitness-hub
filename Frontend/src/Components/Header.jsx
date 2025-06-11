import React from "react";
import heroBg from "../assets/hero.jpg";
import { motion } from "framer-motion";

const Header = ({ scrollToPricing }) => {
  return (
    <>
      <div
        className="h-screen w-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-white text-6xl sm:text-7xl md:text-[6vw] font-bold text-center drop-shadow-lg md:pt-12 pt-12"
        >
          The Tiger <br /> Gym
        </motion.h1>

        <div className="w-full text-white text-center px-4 py-10 mt-8 md:16">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 tracking-wide"
          >
            Train Hard. Stay Strong. Be Legendary.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl mb-10"
          >
            Join Tiger Gym and take your fitness to the next level.
          </motion.p>

          <motion.button
            onClick={scrollToPricing}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.9 }}
            className="bg-gradient-to-r from-red-600 cursor-pointer via-red-500 hover:from-red-800 hover:to-red-800 text-white font-bold py-5 px-8 rounded-full transition duration-300 shadow-lg "
          >
            💪Level Up
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default Header;
