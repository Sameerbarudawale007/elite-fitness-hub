import React from "react";
import Signup from "./Signup";
import { useNavigate } from "react-router-dom";

const SignUpPopup = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="relative w-full max-w-2xl mx-auto p-4">
        <button
          onClick={handleClose}
          className="absolute top-16 right-3 md:top-10 md:right-4 cursor-pointer text-white text-3xl font-bold hover:text-red-400 z-50"
        >
          ✕
        </button>
        <div className="hover:scale-105 transition duration-300 cursor-pointer rounded-lg overflow-hidden shadow-lg">
          <Signup />
        </div>
      </div>
    </div>
  );
};

export default SignUpPopup;
