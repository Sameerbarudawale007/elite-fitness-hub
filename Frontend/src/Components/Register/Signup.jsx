import { useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [inputField, setInputField] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);

  const handleOnChange = (event, field) => {
    setInputField({ ...inputField, [field]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, email, password } = inputField;

    if (!userName || !email || !password) {
      return toast.error("Please fill in all fields.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email.");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters long.");
    }

    try {
      const res = await axios.post(
        "https://elite-fitness-hub-backend.onrender.com/auth/register",
        inputField
      );

      if (res?.data?.message) {
        toast.success(res.data.message);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error("Unexpected response from server.");
      }

      setInputField({
        userName: "",
        email: "",
        password: "",
      });
    } catch (err) {
      console.error(err);
      const message =
        err?.response?.data?.error || err?.message || "Something went wrong.";
      toast.error(message);
    }
  };

  return (
    <div className="bg-black/50 backdrop-blur-sm min-h-screen text-white flex items-center justify-center px-4 sm:px-6 md:px-8">
      <div className="bg-gradient-to-br from-orange-700 to-black p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          🏋️ Join <span className="text-yellow-400">Tiger Gym</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-semibold">
              Full Name
            </label>
            <input
              value={inputField.userName}
              onChange={(e) => handleOnChange(e, "userName")}
              type="text"
              className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-orange-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">Email</label>
            <input
              value={inputField.email}
              onChange={(e) => handleOnChange(e, "email")}
              type="email"
              className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-orange-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">Password</label>
            <input
              value={inputField.password}
              onChange={(e) => handleOnChange(e, "password")}
              type="password"
              className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-orange-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer py-3 rounded-md bg-orange-600 hover:bg-orange-700 transition font-bold text-black text-lg"
          >
            Sign Up & Level Up 💪
          </button>
        </form>

        <p className="text-sm text-center px-1 sm:px-4 mt-6">
          🙋‍♂️ Already have an account?{" "}
          <Link
            to="/login"
            className="text-yellow-300 underline hover:text-yellow-400 transition duration-200"
          >
            🔑 Login here
          </Link>
        </p>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}
