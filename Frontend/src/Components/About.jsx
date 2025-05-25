import React from "react";
import Tiger from "../assets/Tiger.jpg";
import Feature from "./Feature";
import Trainers from "./Trainers";

const About = () => {
  return (
    <section className="bg-black text-white px-4 py-12 md:px-20 lg:px-32">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-5/12">
          <img
            src={Tiger}
            alt="Tiger Gym Workout"
            className="rounded-xl shadow-lg w-full h-auto max-h-[400px] object-cover md:rounded-2xl"
          />
        </div>
        <div className="w-full md:w-7/12 text-center md:text-left space-y-5">
          <h2 className="text-4xl font-bold underline underline-offset-4 text-orange-600 animate-pulse transition-all duration-300">
            About Our Gym
          </h2>
          <h3 className="text-2xl font-semibold animate-pulse transition-all duration-300">
            Welcome to The Tiger Gym 🐯💪
          </h3>
          <p className="text-lg leading-relaxed">
            At TigerGym, fitness is not just a goal — it's a lifestyle 🔥. We're
            here to help you build strength 💥, stay fit 🏋️‍♂️, and feel confident
            every day 😎.
          </p>
          <p className="text-lg leading-relaxed">
            Our gym offers the latest equipment 🛠️, spacious workout zones 🧘,
            and a clean, motivating environment ✨.
          </p>
          <p className="text-lg leading-relaxed">
            Whether you're starting out 🚀 or pushing further 🧗‍♂️, our expert
            trainers are with you every step of the way 🤝.
          </p>
          <p className="text-lg leading-relaxed">
            Join us today and become part of a fitness community that supports
            and inspires you! 🙌🏽🏆
          </p>
        </div>
      </div>
      <Feature />
      <Trainers />
    </section>
  );
};

export default About;
