import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, ToastContainer } from "react-toastify";

const AddMembers = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const [loader, setLoader] = useState(false);
  const [membershipList, setMembershipList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  const navigate = useNavigate();
  const handleClose = () => {
    navigate(-1);
  };

  const [inputField, setInputField] = useState({
    name: "",
    mobile: "",
    aadhaar: "",
    address: "",
    joiningDate: "",
    membership: "",
    file: "https://imgs.search.brave.com/1OA6DJ-GWRTkU7ZI17Z9aVWZ2iNy7Bc7vlymr0DXuDk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2I1LzZj/L2IyL2I1NmNiMjg1/ZTYyMzIxNTdkZmQ2/Nzk3NmE3ZjkyMGE5/LmpwZw",
  });
  console.log(inputField);

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
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
      setInputField({ ...inputField, file: imageUrl });
    } catch (err) {
      console.log(err);
      setLoader(false);
      toast.error("Image upload failed. Please try again.");
    }
  };

  const fetchMembership = async () => {
    await axios
      .get("http://localhost:4000/plans/get-membership", {
        withCredentials: true,
      })
      .then((res) => {
        setMembershipList(res.data.membership);
        if (res.data.membership.length === 0) {
          return toast.error("No any Membership added Yet", {
            className: "text-lg",
          });
        } else {
          let a = res.data.membership[0]._id;
          setSelectedOption(a);
          setInputField({ ...inputField, membership: a });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Wrong Happened");
      });
  };

  useEffect(() => {
    fetchMembership();
  }, []);

  const handleRegisterButton = async () => {
    const endpoint = "http://localhost:4000/members/register-member";

    const memberData = {
      ...inputField,
      gymId: "682d790852242c3ff529509b",
    };

    try {
      const res = await axios.post(endpoint, inputField, {
        withCredentials: true,
      });
      toast.success(res.data.message);
      setTimeout(() => navigate(-1), 2000);
    } catch (err) {
      if (err.response && err.response.status === 409) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Something went wrong!");
      }
      console.error(err);
    }
  };

  const handleOnChangeSelect = (event) => {
    let value = event.target.value;
    setSelectedOption(value);
    setInputField({ ...inputField, membership: value });
  };

  return (
    <div
      className="
      fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 
      px-4 sm:px-6 md:px-8
      overflow-y-auto
    "
    >
      <div
        className="
        relative bg-gradient-to-br from-zinc-900 to-zinc-800 p-5 sm:p-8 rounded-2xl
        w-full max-w-md sm:max-w-lg md:max-w-2xl
        shadow-2xl
        max-h-[90vh] overflow-y-auto
        transform transition-all duration-300 ease-in-out
        scale-100 opacity-100
        animate-fadeInScale
      "
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="
          absolute top-3 right-4 cursor-pointer text-white text-4xl
          transition-colors duration-300 hover:text-red-500
          select-none
        "
          aria-label="Close modal"
        >
          ×
        </button>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-8 text-orange-500">
          Add New Member
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Name of the Joinee
            </label>
            <input
              value={inputField.name}
              onChange={(e) => handleOnChange(e, "name")}
              type="text"
              className="
              w-full px-4 py-3 rounded-lg bg-zinc-700 text-white outline-none
              focus:ring-2 focus:ring-yellow-500 transition duration-300
            "
              placeholder="Enter name"
              required
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Mobile Number
            </label>
            <input
              value={inputField.mobile}
              onChange={(e) => handleOnChange(e, "mobile")}
              type="tel"
              className="
              w-full px-4 py-3 rounded-lg bg-zinc-700 text-white outline-none
              focus:ring-2 focus:ring-yellow-500 transition duration-300
            "
              placeholder="Enter mobile number"
              required
            />
          </div>

          {/* Aadhaar Number */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Aadhaar Number
            </label>
            <input
              value={inputField.aadhaar}
              onChange={(e) => handleOnChange(e, "aadhaar")}
              type="text"
              maxLength="12"
              pattern="\d{12}"
              title="Aadhaar number must be 12 digits"
              className="
              w-full px-4 py-3 rounded-lg bg-zinc-700 text-white outline-none
              focus:ring-2 focus:ring-yellow-500 transition duration-300
            "
              placeholder="Enter 12-digit Aadhaar number"
              required
            />
          </div>

          {/* Joining Date */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Date of Joining{" "}
              <span className="text-gray-400 text-xs">(select date)</span>
            </label>
            <input
              value={inputField.joiningDate}
              onChange={(e) => handleOnChange(e, "joiningDate")}
              type="date"
              className="
              w-full px-4 py-3 rounded-lg bg-zinc-700 text-white outline-none
              focus:ring-2 focus:ring-yellow-500 transition duration-300
            "
              required
            />
          </div>

          {/* Address */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-white mb-2">
              Address
            </label>
            <textarea
              value={inputField.address}
              onChange={(e) => handleOnChange(e, "address")}
              className="
              w-full px-4 py-3 rounded-lg bg-zinc-700 text-white outline-none
              focus:ring-2 focus:ring-yellow-500 transition duration-300
            "
              placeholder="Enter address"
              rows="3"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Profile Photo
            </label>
            <input
              type="file"
              onChange={uploadImage}
              name="file"
              accept="image/*"
              className="
              w-full cursor-pointer bg-gray-800 text-white
              file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0
              file:text-sm file:font-semibold file:bg-yellow-600 file:text-white
              hover:file:bg-yellow-700
              transition duration-300
            "
            />
            {loader && (
              <div className="flex justify-center mt-3">
                <CircularProgress size={26} sx={{ color: "yellow" }} />
              </div>
            )}
            {/* Preview Image */}
            <img
              src={inputField.file}
              alt="Preview"
              className="mt-5 h-28 w-28 mx-auto rounded-full object-cover object-center border-2 border-yellow-400 cursor-pointer transition-transform duration-300 hover:scale-110"
            />
          </div>

          {/* Membership Select */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Membership
            </label>
            <select
              value={selectedOption}
              onChange={handleOnChangeSelect}
              className="
              w-full px-4 py-3 rounded-lg bg-zinc-700 text-white outline-none
              focus:ring-2 focus:ring-yellow-500 transition duration-300
            "
              required
            >
              {membershipList.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.title} - {item.months} Month
                  {item.months > 1 ? "s" : ""} - ₹{item.price}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2">
            <button
              onClick={handleRegisterButton}
              type="submit"
              className="
              bg-red-500 w-full py-3 rounded-lg text-white font-semibold
              hover:bg-orange-600 transition-colors duration-300
              focus:outline-none focus:ring-4 focus:ring-red-400
              select-none cursor-pointer
            "
            >
              Register
            </button>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default AddMembers;
