import React from "react";
import Arish from "../assets/Arish.jpg";
import Afzal from "../assets/Afzal.jpg";
import Juned from "../assets/Juned.jpg";

const Trainers = () => {
  return (
    <div className="bg-black text-white py-10 px-6 md:px-20">
      <h2 className="text-2xl font-bold text-center mb-8 text-orange-600 animate-pulse transition-all duration-300">
        Meet Our Trainers💪
      </h2>
      <h4 className="text-1xl font-bold text-center mb-8">
        Our trainers are here to dedicate the time and efforts that you need to
        get in the best shape of your life.
      </h4>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition duration-300 cursor-pointer">
          <div className="text-4xl mb-4">
            <img
              className="h-72 w-full object-cover hover:scale-110 transition duration-300 md:object-left-top rounded-2xl"
              src={Arish}
              alt="Arish"
            />
          </div>
          <h3 className="text-xl font-semibold mb-2">Aarish Barudawale</h3>
          <p>
            Certified Trainer | 15 Years of Trusted Expertise in Professional
            Coaching
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition duration-300 cursor-pointer">
          <div className="text-4xl mb-4">
            <img
              className="h-72 w-full object-cover rounded-2xl hover:scale-110 transition duration-300"
              src={Afzal}
              alt="Afzal"
            />
          </div>
          <h3 className="text-xl font-semibold mb-2">Afzal Barudawale</h3>
          <p>
            Dedicated Trainer with 4 Years of Hands-On Experience in Delivering
            Real Results
          </p>
        </div>
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition duration-300 cursor-pointer">
          <div className="text-4xl mb-4">
            <img
              className="h-72 w-full object-cover object-left-top rounded-2xl hover:scale-110 transition duration-300"
              src={Juned}
              alt="Juned"
            />
          </div>
          <h3 className="text-xl font-semibold mb-2">Juned Mulla</h3>
          <p>
            Trusted Trainer Backed by 4 Years of Practical Coaching Excellence
          </p>
        </div>
      </div>
    </div>
  );
};

export default Trainers;
