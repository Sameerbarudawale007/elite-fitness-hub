import React from "react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {

const navigate = useNavigate();

  return (
    <div className="bg-black text-white py-10 px-6 md:px-20">
      <h1 className="text-2xl text-center font-bold text-red-500 mb-5 animate-pulse transition-all duration-300">
        Our Plan
      </h1>
      <h1 className="text-2xl text-center md:text-5xl font-extrabold mb-5 animate-pulse transition-all duration-300">
        Choose Your Pricing Plan
      </h1>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="flex justify-center items-center bg-black">
          <div className="relative bg-black text-white cursor-pointer px-8 py-10 w-80 transform -skew-y-3 border border-gray-600 mt-10 hover:scale-110 duration-300">
            <div className="transform skew-y-3">
              <h2 className="text-2xl font-bold mb-2">Membership</h2>
              <p className="text-orange-500 text-2xl font-extrabold mb-4">
                ₹1200 /-
              </p>
              <p className="text-sm mb-4">Monthly ₹600</p>
              <ul className="text-sm space-y-2">
                <li>Access to all equipment</li>
                <li>Regular workout support</li>
                <li>Flexible timings</li>
              </ul>
              <button onClick={() => navigate("/add-members")} className="text-sm px-6 items-center mt-10 cursor-pointer py-3 font-bold bg-white text-black hover:bg-red-600 hover:text-white rounded-2xl hover:scale-105 transition-transform duration-300 ease-in-out">
                Enroll Now
              </button>
            </div>
          </div>
        </div>

        <div className="relative bg-black text-white px-8 py-10 w-80 transform -skew-y-3 border border-gray-600 mt-20 hover:scale-110 duration-300">
          <div className="transform skew-y-3">
            <h2 className="text-xl font-bold mb-2">Without Membership</h2>
            <p className="text-orange-500 text-2xl font-extrabold mb-4">
              ₹800 /-
            </p>
            <p className="text-sm mb-4">Monthly ₹800</p>
            <ul className="text-sm space-y-2">
              <li>Limited access</li>
              <li>Per-session based</li>
              <li>No commitment</li>
            </ul>
            <button onClick={() => navigate("/add-members")} className="text-sm px-6 items-center mt-10 cursor-pointer py-3 font-bold bg-white text-black hover:bg-red-600 hover:text-white rounded-2xl hover:scale-105 transition-transform duration-300 ease-in-out">
              Enroll Now
            </button>
          </div>
        </div>

        <div className="relative bg-black text-white px-8 py-10 w-80 transform -skew-y-3 border border-gray-600 mt-20 hover:scale-110 duration-300 cursor-pointer">
          <div className="transform skew-y-3">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Students (3 Months)
            </h2>
            <p className="text-orange-500 text-3xl font-extrabold mb-2">
              ₹2500 /-
            </p>
            <p className="text-sm mb-4">Special discount for students.</p>
            <ul className="text-sm space-y-2">
              <li>Unlimited access</li>
              <li>Training support</li>
              <li>Flexible timings</li>
            </ul>
            <button onClick={() => navigate("/add-members")} className="text-sm px-6 items-center mt-10 cursor-pointer py-3 font-bold bg-white text-black hover:bg-red-600 hover:text-white rounded-2xl hover:scale-105 transition-transform duration-300 ease-in-out">
              Enroll Now
            </button>
          </div>
        </div>

        <div className="relative bg-black text-white px-8 py-10 w-80 transform -skew-y-3 border border-gray-600 mt-20 hover:scale-110 duration-300 cursor-pointer">
          <div className="transform skew-y-3">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Students (6 Months)
            </h2>
            <p className="text-orange-500 text-3xl font-extrabold mb-2">
              ₹4500 /-
            </p>
            <p className="text-sm mb-4">Special discount for Members.</p>
            <ul className="text-sm space-y-3">
              <li>Unlimited access</li>
              <li>Training support</li>
              <li>Flexible timings</li>
            </ul>
            <button onClick={() => navigate("/add-members")} className="text-sm px-6 items-center mt-10 cursor-pointer py-3 font-bold bg-white text-black hover:bg-red-600 hover:text-white rounded-2xl hover:scale-105 transition-transform duration-300 ease-in-out">
              Enroll Now
            </button>
          </div>
        </div>

        <div className="relative bg-black text-white px-8 py-10 w-80 transform -skew-y-3 border border-gray-600 mt-20 hover:scale-110 duration-300 cursor-pointer">
          <div className="transform skew-y-3">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Personal Training
            </h2>
            <p className="text-orange-500 text-3xl font-extrabold mb-4">
              ₹2000 /-
            </p>
            <p className="text-sm mb-4">Special discount for students.</p>
            <ul className="text-sm space-y-2">
              <li>Fat loss & muscle gain</li>
              <li>Height increase plans</li>
              <li>Specialized PCOD & Thyroid training</li>
            </ul>
            <button onClick={() => navigate("/add-members")} className="text-sm px-6 items-center mt-10 cursor-pointer py-3 font-bold bg-white text-black hover:bg-red-600 hover:text-white rounded-2xl hover:scale-105 transition-transform duration-300 ease-in-out">
              Enroll Now
            </button>
          </div>
        </div>

        <div className="relative bg-black text-white px-8 py-10 w-80 transform -skew-y-3 border border-gray-600 mt-20 hover:scale-110 duration-300 cursor-pointer">
          <div className="transform skew-y-3">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Body Building
            </h2>
            <p className="text-orange-500 text-3xl font-extrabold mb-4">
              ₹1200 /-
            </p>
            <ul className="text-sm space-y-3">
              <li>Includes Powerlifting</li>
              <li>Weightlifting programs</li>
              <li>Advanced equipment access</li>
            </ul>
            <button onClick={() => navigate("/add-members")} className="text-sm px-6 items-center mt-10 cursor-pointer py-3 font-bold bg-white text-black hover:bg-red-600 hover:text-white rounded-2xl hover:scale-105 transition-transform duration-300 ease-in-out">
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
