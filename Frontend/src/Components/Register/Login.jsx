import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
  const [loginField, setLoginField] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/");
  };

  const handleOnChange = (event, name) => {
    setLoginField({ ...loginField, [name]: event.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:4000/auth/login",
        loginField,
        { withCredentials: true }
      );
      console.log(res.data);

      localStorage.setItem("gymPic", res.data.gym.profilePic);
      localStorage.setItem("isLogin", true);
      localStorage.setItem("token", res.data.token);

      toast.success(res.data.message);

      setLoginField({
        userName: "",
        password: "",
      });

      if (res.data.gym.role === "admin") {
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        toast.error("Only admin can access the dashboard.");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.error || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black transition-all">
      <div className="relative bg-gradient-to-b from-orange-500 to-red-700 text-white rounded-2xl shadow-2xl w-[90%] max-w-md p-8 mx-4 sm:mx-0">
        <button
          onClick={handleClose}
          className="absolute top-3 right-4 cursor-pointer text-white text-2xl hover:text-red-300 transition"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-center mb-6">
          🔐 Login to <span className="text-yellow-300">Tiger Gym</span>
        </h2>

        <div className="space-y-4">
          <input
            value={loginField.userName}
            onChange={(e) => handleOnChange(e, "userName")}
            required
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 rounded bg-gray-900 text-white focus:outline-none placeholder-white"
          />
          <input
            value={loginField.password}
            onChange={(e) => handleOnChange(e, "password")}
            required
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded bg-gray-900 text-white focus:outline-none placeholder-white"
          />
          <button
            onClick={handleLogin}
            className="w-full cursor-pointer bg-orange-600 hover:bg-orange-700 text-white py-2 rounded font-semibold transition"
          >
            Login
          </button>
          <p className="text-sm sm:text-base md:text-sm text-center px-2 sm:px-4">
            🙋‍♂️ Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-yellow-300 underline hover:text-yellow-400 transition duration-200"
            >
              📝 Register here
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
