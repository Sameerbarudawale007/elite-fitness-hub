import React from "react";

const Feature = () => {
  return (
    <div className="bg-black text-white py-10 px-6 md:px-20">
      <h2 className="text-3xl font-bold text-center mb-8 text-orange-600 animate-pulse transition-all duration-300">
        Why Choose Us?
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition duration-300 cursor-pointer">
          <div className="text-4xl mb-4">🏋️‍♂️</div>
          <h3 className="text-xl font-semibold mb-2">Professional Trainers</h3>
          <p>Get personalized training from certified fitness experts.</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition duration-300 cursor-pointer">
          <div className="text-4xl mb-4">💪</div>
          <h3 className="text-xl font-semibold mb-2">Modern Equipment</h3>
          <p>We provide the latest gym equipment for effective workouts.</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg text-center hover:scale-105 transition duration-300 cursor-pointer">
          <div className="text-4xl mb-4">🗓️</div>
          <h3 className="text-xl font-semibold mb-2">Flexible Schedules</h3>
          <p>Choose a workout schedule that fits your lifestyle.</p>
        </div>
      </div>
    </div>
  );
};

export default Feature;
