import React from "react";
import Tiger from "../assets/Tiger.jpg";
import Feature from "./Feature";
import Trainers from "./Trainers";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="bg-black text-white px-4 py-12 md:px-20 lg:px-32">
      {/* Highlighted Banner */}
      <motion.div
        className="bg-gradient-to-r from-orange-500 via-yellow-400 to-red-500 text-black font-bold text-center py-4 px-6 rounded-xl shadow-md text-lg sm:text-xl md:text-2xl mb-10 animate-pulse"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
      Dharwad's Fastest Powerlifting Academy🏋️ – State & National Level Powerlifter & Bench Presser 🏆🔥
      </motion.div>

      <div className="flex flex-col md:flex-row items-center gap-12">
        <motion.div
          className="w-full md:w-5/12"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <img
            src={Tiger}
            alt="Tiger Gym Workout"
            className="rounded-xl shadow-lg w-full h-auto max-h-[400px] object-cover md:rounded-2xl"
          />
        </motion.div>

        <motion.div
          className="w-full md:w-7/12 text-center md:text-left space-y-5"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl font-bold underline underline-offset-4 text-orange-600 animate-pulse transition-all duration-300"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            About Our Gym
          </motion.h2>
          <motion.h3
            className="text-2xl font-semibold animate-pulse transition-all duration-300"
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Welcome to The Tiger Gym 🐯💪
          </motion.h3>
          <motion.p
            className="text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            At TigerGym, fitness is not just a goal — it's a lifestyle 🔥. We're
            here to help you build strength 💥, stay fit 🏋️‍♂️, and feel confident
            every day 😎.
          </motion.p>
          <motion.p
            className="text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Our gym offers the latest equipment 🛠️, spacious workout zones 🧘,
            and a clean, motivating environment ✨.
          </motion.p>
          <motion.p
            className="text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Whether you're starting out 🚀 or pushing further 🧗‍♂️, our expert
            trainers are with you every step of the way 🤝.
          </motion.p>
          <motion.p
            className="text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Join us today and become part of a fitness community that supports
            and inspires you! 🙌🏽🏆
          </motion.p>
        </motion.div>
      </div>
      <Feature />
      <Trainers />
    </section>
  );
};

export default About;
