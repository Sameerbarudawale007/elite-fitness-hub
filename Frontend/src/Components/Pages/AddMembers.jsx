import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, ToastContainer } from "react-toastify";

const AddMembers = () => {
  const [loader, setLoader] = useState(false);
  const [membershipList, setMembershipList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const navigate = useNavigate();

  const [inputField, setInputField] = useState({
    name: "",
    mobile: "",
    aadhaar: "",
    address: "",
    joiningDate: "",
    membership: "",
    file: "https://imgs.search.brave.com/1OA6DJ-GWRTkU7ZI17Z9aVWZ2iNy7Bc7vlymr0DXuDk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2I1LzZj/L2IyL2I1NmNiMjg1/ZTYyMzIxNTdkZmQ2/Nzk3NmE3ZjkyMGE5/LmpwZw",
  });

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ["image/jpeg", "image/png"];
    if (!validTypes.includes(file.type)) {
      toast.error("Only JPEG and PNG image formats are allowed.");
      event.target.value = "";
      return;
    }

    setLoader(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "The-Tiger-Gym");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dxgj9kcey/image/upload",
        data
      );
      const imageUrl = response.data.url;
      setInputField({ ...inputField, file: imageUrl });
    } catch (err) {
      console.error(err);
      toast.error("Image upload failed. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  const fetchMembership = async () => {
    try {
      const res = await axios.get("http://localhost:4000/plans/get-membership", {
        withCredentials: true,
      });

      setMembershipList(res.data.membership);
      if (res.data.membership.length === 0) {
        toast.error("No Membership added yet.");
      } else {
        const defaultId = res.data.membership[0]._id;
        setSelectedOption(defaultId);
        setInputField((prev) => ({ ...prev, membership: defaultId }));
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch memberships.");
    }
  };

  useEffect(() => {
    fetchMembership();
  }, []);

  const handleRegisterButton = async () => {
    const { name, mobile, aadhaar, address, joiningDate, membership, file } =
      inputField;

    // Basic validation
    if (!name || !mobile || !aadhaar || !address || !joiningDate || !membership || !file) {
      return toast.error("All fields are required.");
    }

    if (!/^\d{10}$/.test(mobile)) {
      return toast.error("Mobile number must be 10 digits.");
    }

    if (!/^\d{12}$/.test(aadhaar)) {
      return toast.error("Aadhaar number must be 12 digits.");
    }

    const allowedExts = ["jpg", "jpeg", "png"];
    const fileExt = file.split(".").pop().toLowerCase();
    if (!allowedExts.includes(fileExt)) {
      return toast.error("Profile photo must be JPG, JPEG, or PNG.");
    }

    const memberData = {
      ...inputField,
      gymId: "682d790852242c3ff529509b",
    };

    try {
      const res = await axios.post(
        "http://localhost:4000/members/register-member",
        memberData,
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      setTimeout(() => navigate(-1), 2000);
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const handleOnChangeSelect = (event) => {
    const value = event.target.value;
    setSelectedOption(value);
    setInputField({ ...inputField, membership: value });
  };

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4 sm:px-6 md:px-8 overflow-y-auto">
      <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-800 p-5 sm:p-8 rounded-2xl w-full max-w-md sm:max-w-lg md:max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-3 right-4 cursor-pointer text-white text-4xl hover:text-red-500"
        >
          ×
        </button>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-8 text-orange-500">
          Add New Member
        </h2>

        <form className="grid grid-cols-1 sm:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-white mb-2">Name of the Joinee</label>
            <input
              type="text"
              value={inputField.name}
              onChange={(e) => handleOnChange(e, "name")}
              placeholder="Enter name"
              className="w-full px-4 py-3 rounded-lg bg-zinc-700 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Mobile Number</label>
            <input
              type="tel"
              value={inputField.mobile}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d{0,10}$/.test(val)) handleOnChange(e, "mobile");
              }}
              maxLength="10"
              pattern="\d{10}"
              placeholder="Enter 10-digit mobile number"
              className="w-full px-4 py-3 rounded-lg bg-zinc-700 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Aadhaar Number</label>
            <input
              type="text"
              value={inputField.aadhaar}
              onChange={(e) => handleOnChange(e, "aadhaar")}
              maxLength="12"
              pattern="\d{12}"
              placeholder="Enter 12-digit Aadhaar number"
              className="w-full px-4 py-3 rounded-lg bg-zinc-700 text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Date of Joining <span className="text-gray-400 text-xs">(select date)</span>
            </label>
            <input
              type="date"
              min={new Date().toISOString().split("T")[0]}
              value={inputField.joiningDate}
              onChange={(e) => handleOnChange(e, "joiningDate")}
              className="w-full px-4 py-3 rounded-lg bg-zinc-700 text-white"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-white mb-2">Address</label>
            <textarea
              value={inputField.address}
              onChange={(e) => handleOnChange(e, "address")}
              rows="3"
              placeholder="Enter address"
              className="w-full px-4 py-3 rounded-lg bg-zinc-700 text-white"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Profile Photo</label>
            <input
              type="file"
              onChange={uploadImage}
              accept="image/*"
              className="w-full bg-gray-800 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-yellow-600 file:text-white hover:file:bg-yellow-700"
            />
            {loader && (
              <div className="flex justify-center mt-3">
                <CircularProgress size={26} sx={{ color: "yellow" }} />
              </div>
            )}
            {inputField.file && (
              <img
                src={inputField.file}
                alt="Preview"
                className="mt-5 h-28 w-28 mx-auto rounded-full object-cover border-2 border-yellow-400 hover:scale-110 transition-transform duration-300"
              />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Membership</label>
            <select
              value={selectedOption}
              onChange={handleOnChangeSelect}
              className="w-full px-4 py-3 rounded-lg bg-zinc-700 text-white"
              required
            >
              {membershipList.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.title} - {item.months} Month{item.months > 1 ? "s" : ""} - ₹{item.price}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <button
              onClick={handleRegisterButton}
              type="submit"
              className="bg-red-500 w-full py-3 rounded-lg text-white font-semibold hover:bg-orange-600 transition-colors"
            >
              Register
            </button>
          </div>
        </form>

        <ToastContainer position="top-right" />
      </div>
    </div>
  );
};

export default AddMembers;
