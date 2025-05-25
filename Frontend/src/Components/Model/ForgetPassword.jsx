import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
  const [emailSubmit, setEmailSubmit] = useState(false);
  const [otpValidate, setOtpValidate] = useState(false);
  const [contentValue, setContentValue] = useState("Submit Your Email");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [inputField, setInputField] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handleSubmit = () => {
    if (!emailSubmit) {
      setEmailSubmit(true);
      setContentValue("Submit Your OTP");
      setMessage("OTP has been sent to your email address! 📧");
    } else if (emailSubmit && !otpValidate) {
      setOtpValidate(true);
      setContentValue("Submit Your Password");
    }
  };

  const handleChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black transition-all relative px-4">
      <div className="w-full max-w-md bg-gradient-to-br from-orange-700 to-black backdrop-blur-lg rounded-2xl shadow-xl p-6 sm:p-8 text-white">
        <button
          onClick={() => navigate("/login")}
          className="absolute top-4 right-4 z-50 cursor-pointer text-white text-3xl hover:text-red-400 transition"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-yellow-300 mb-4 text-center">
          Forgot Your Password? 🔐
        </h2>
        <p className="text-center mb-6">
          Enter your email and we’ll send you a one-time OTP to reset your
          password.
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          {!emailSubmit && (
            <input
              value={inputField.email}
              onChange={(e) => handleChange(e, "email")}
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-orange-300 bg-gray-900 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          )}
          {emailSubmit && !otpValidate && (
            <div>
              <p className="text-center mb-2">Enter your OTP</p>
              <input
                type="text"
                onChange={(e) => handleChange(e, "otp")}
                value={inputField.otp}
                placeholder="Enter your OTP"
                className="w-full p-3 border border-orange-300 bg-gray-900 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          )}
          {otpValidate && (
            <div>
              <p className="text-center mb-2">Enter your New Password</p>
              <input
                type="password"
                onChange={(e) => handleChange(e, "newPassword")}
                value={inputField.newPassword}
                placeholder="Enter New Password"
                className="w-full p-3 border border-orange-300 bg-gray-900 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          )}
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl font-semibold transition duration-300"
          >
            {contentValue}
          </button>
        </form>
        {message && (
          <p className="mt-4 text-green-400 text-center font-medium">
            {message}
          </p>
        )}
        <p className="text-sm text-gray-400 mt-6 text-center">
          Make sure to check your spam folder too! 📥
        </p>
      </div>
    </div>
  );
}
