import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white py-10 px-6 md:px-20">
      {/* Main headings */}
      <motion.h1
        className="text-2xl text-center font-bold text-red-500 mb-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        whileHover={{ scale: 1.1, color: "#fb7185", textShadow: "0 0 8px #fb7185" }}
      >
        Our Plan
      </motion.h1>

      <motion.h1
        className="text-2xl text-center md:text-5xl font-extrabold mb-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        whileHover={{ scale: 1.05, color: "#f97316", textShadow: "0 0 10px #f97316" }}
      >
        Choose Your Pricing Plan
      </motion.h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {/* Membership Card */}
        <div className="flex justify-center items-center bg-black">
          <div className="relative bg-black text-white cursor-pointer px-8 py-10 w-80 transform -skew-y-3 border border-gray-600 mt-10 hover:scale-110 duration-300">
            <div className="transform skew-y-3">
              {/* Only headings and price animated */}
              <motion.h2
                className="text-2xl font-bold mb-2 text-orange-500"
                whileHover={{ scale: 1.1, color: "#facc15", textShadow: "0 0 10px #facc15" }}
              >
                Membership
              </motion.h2>

              <motion.p
                className="text-orange-500 text-2xl font-extrabold mb-4"
                whileHover={{ scale: 1.1, color: "#84cc16" }}
              >
                ₹1200 /-
              </motion.p>

              <p className="text-sm mb-4">Monthly ₹600</p>

              <ul className="text-sm space-y-2">
                <li>Access to all equipment</li>
                <li>Regular workout support</li>
                <li>Flexible timings</li>
              </ul>

              <button
                onClick={() => navigate("/add-members")}
                className="text-sm px-6 items-center mt-10 cursor-pointer py-3 font-bold bg-white text-black hover:bg-red-600 hover:text-white rounded-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
              >
                Enroll Now
              </button>
            </div>
          </div>
        </div>

        {/* Without Membership Card */}
        <div className="relative bg-black text-white px-8 py-10 w-80 transform -skew-y-3 border border-gray-600 mt-20 hover:scale-110 duration-300">
          <div className="transform skew-y-3">
            <motion.h2
              className="text-xl font-bold mb-2 text-orange-500"
              whileHover={{ scale: 1.1, color: "#facc15", textShadow: "0 0 10px #facc15" }}
            >
              Without Membership
            </motion.h2>

            <motion.p
              className="text-orange-500 text-2xl font-extrabold mb-4"
              whileHover={{ scale: 1.1, color: "#84cc16" }}
            >
              ₹800 /-
            </motion.p>

            <p className="text-sm mb-4">Monthly ₹800</p>

            <ul className="text-sm space-y-2">
              <li>Limited access</li>
              <li>Per-session based</li>
              <li>No commitment</li>
            </ul>

            <button
              onClick={() => navigate("/add-members")}
              className="text-sm px-6 items-center mt-10 cursor-pointer py-3 font-bold bg-white text-black hover:bg-red-600 hover:text-white rounded-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Enroll Now
            </button>
          </div>
        </div>

        {/* Students (3 Months) Card */}
        <div className="relative bg-black text-white px-8 py-10 w-80 transform -skew-y-3 border border-gray-600 mt-20 hover:scale-110 duration-300 cursor-pointer">
          <div className="transform skew-y-3">
            <motion.h2
              className="text-xl md:text-2xl font-bold mb-4 text-orange-500"
              whileHover={{ scale: 1.1, color: "#facc15", textShadow: "0 0 10px #facc15" }}
            >
              Students (3 Months)
            </motion.h2>

            <motion.p
              className="text-orange-500 text-3xl font-extrabold mb-2"
              whileHover={{ scale: 1.1, color: "#84cc16" }}
            >
              ₹2500 /-
            </motion.p>

            <p className="text-sm mb-4">Special discount for students.</p>

            <ul className="text-sm space-y-2">
              <li>Unlimited access</li>
              <li>Training support</li>
              <li>Flexible timings</li>
            </ul>

            <button
              onClick={() => navigate("/add-members")}
              className="text-sm px-6 items-center mt-10 cursor-pointer py-3 font-bold bg-white text-black hover:bg-red-600 hover:text-white rounded-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Enroll Now
            </button>
          </div>
        </div>

        {/* Students (6 Months) Card */}
        <div className="relative bg-black text-white px-8 py-10 w-80 transform -skew-y-3 border border-gray-600 mt-20 hover:scale-110 duration-300 cursor-pointer">
          <div className="transform skew-y-3">
            <motion.h2
              className="text-xl md:text-2xl font-bold mb-4 text-orange-500"
              whileHover={{ scale: 1.1, color: "#facc15", textShadow: "0 0 10px #facc15" }}
            >
              Students (6 Months)
            </motion.h2>

            <motion.p
              className="text-orange-500 text-3xl font-extrabold mb-2"
              whileHover={{ scale: 1.1, color: "#84cc16" }}
            >
              ₹4500 /-
            </motion.p>

            <p className="text-sm mb-4">Special discount for Members.</p>

            <ul className="text-sm space-y-3">
              <li>Unlimited access</li>
              <li>Training support</li>
              <li>Flexible timings</li>
            </ul>

            <button
              onClick={() => navigate("/add-members")}
              className="text-sm px-6 items-center mt-10 cursor-pointer py-3 font-bold bg-white text-black hover:bg-red-600 hover:text-white rounded-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Enroll Now
            </button>
          </div>
        </div>

        {/* Personal Training Card */}
        <div className="relative bg-black text-white px-8 py-10 w-80 transform -skew-y-3 border border-gray-600 mt-20 hover:scale-110 duration-300 cursor-pointer">
          <div className="transform skew-y-3">
            <motion.h2
              className="text-xl md:text-2xl font-bold mb-4 text-orange-500"
              whileHover={{ scale: 1.1, color: "#facc15", textShadow: "0 0 10px #facc15" }}
            >
              Personal Training
            </motion.h2>

            <motion.p
              className="text-orange-500 text-3xl font-extrabold mb-4"
              whileHover={{ scale: 1.1, color: "#84cc16" }}
            >
              ₹2000 /-
            </motion.p>

            <p className="text-sm mb-4">Special discount for students.</p>

            <ul className="text-sm space-y-2">
              <li>Fat loss & muscle gain</li>
              <li>Height increase plans</li>
              <li>Specialized PCOD & Thyroid training</li>
            </ul>

            <button
              onClick={() => navigate("/add-members")}
              className="text-sm px-6 items-center mt-10 cursor-pointer py-3 font-bold bg-white text-black hover:bg-red-600 hover:text-white rounded-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Enroll Now
            </button>
          </div>
        </div>

        {/* Body Building Card */}
        <div className="relative bg-black text-white px-8 py-10 w-80 transform -skew-y-3 border border-gray-600 mt-20 hover:scale-110 duration-300 cursor-pointer">
          <div className="transform skew-y-3">
            <motion.h2
              className="text-xl md:text-2xl font-bold mb-4 text-orange-500"
              whileHover={{ scale: 1.1, color: "#facc15", textShadow: "0 0 10px #facc15" }}
            >
              Body Building
            </motion.h2>

            <motion.p
              className="text-orange-500 text-3xl font-extrabold mb-4"
              whileHover={{ scale: 1.1, color: "#84cc16" }}
            >
              ₹1200 /-
            </motion.p>

            <ul className="text-sm space-y-3">
              <li>Includes Powerlifting</li>
              <li>Weightlifting programs</li>
              <li>Advanced equipment access</li>
            </ul>

            <button
              onClick={() => navigate("/add-members")}
              className="text-sm px-6 items-center mt-10 cursor-pointer py-3 font-bold bg-white text-black hover:bg-red-600 hover:text-white rounded-2xl hover:scale-105 transition-transform duration-300 ease-in-out"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
