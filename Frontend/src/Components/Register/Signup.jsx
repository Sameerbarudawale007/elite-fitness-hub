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
    profilePic:
      "https://imgs.search.brave.com/1OA6DJ-GWRTkU7ZI17Z9aVWZ2iNy7Bc7vlymr0DXuDk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2I1LzZj/L2IyL2I1NmNiMjg1/ZTYyMzIxNTdkZmQ2/Nzk3NmE3ZjkyMGE5/LmpwZw",
  });
  const [loader, setLoader] = useState(false);

  const handleOnChange = (event, userName) => {
    setInputField({ ...inputField, [userName]: event.target.value });
  };

  const uploadImage = async (event) => {
    setLoader(true);
    const files = event.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "The-Tiger-Gym");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dxgj9kcey/image/upload",
        data
      );
      const imageUrl = response.data.url;
      setLoader(false);

      setInputField({ ...inputField, profilePic: imageUrl });
    } catch (err) {
      console.log(err);
      setLoader(false);
      toast.error("Image upload failed. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:4000/auth/register",
        inputField
      );
      console.log(res.data);

      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);

      setInputField({
        userName: "",
        email: "",
        password: "",
        profilePic: "",
      });
    } catch (err) {
      console.error(err);
      const errorMsg = err.response.data.message;
      toast.error(errorMsg);
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
              name="name"
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
              name="email"
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
              name="password"
              className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-orange-500 focus:outline-none focus:ring-2 focus:ring-yellow-600"
              placeholder="********"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold">
              Profile Photo
            </label>
            <input
              type="file"
              onChange={(e) => {
                uploadImage(e);
              }}
              name="profilePic"
              accept="image/*"
              className="w-full bg-gray-800 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-600 file:text-white hover:file:bg-yellow-700"
            />
            {loader && (
              <div className="flex justify-center mt-2">
                <CircularProgress size={24} sx={{ color: "yellow" }} />
              </div>
            )}
            <img
              src={inputField.profilePic}
              alt="Preview"
              className="mt-4 h-24 w-24 rounded-full object-cover object-center mx-auto border-2 border-yellow-400"
            />
          </div>

          <button
            onClick={() => handleSubmit}
            type="submit"
            className="w-full cursor-pointer py-3 rounded-md bg-orange-600 hover:bg-orange-700 transition font-bold text-black text-lg"
          >
            Sign Up & Level Up 💪
          </button>
        </form>
        <p className="text-sm md:text-sm text-center px-1 sm:px-4 mt-2 sm:mt-6 md:mt-8">
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
