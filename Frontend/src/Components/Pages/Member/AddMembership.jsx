import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

export default function AddMembership() {
  const navigate = useNavigate();
  const [inputField, setInputField] = useState({ months: "", price: "", title: "" });
  const [membership, setMembership] = useState([]);

  const handleClose = () => {
    navigate(-1);
  };

  const handleOnChange = (event, name) => {
    setInputField({ ...inputField, [name]: event.target.value });
  };

  const fetchMembership = async () => {
    await axios
      .get("http://localhost:4000/plans/get-membership", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setMembership(res.data.membership);
        toast.success(
          res.data.membership.length + " MemberShip fetched Successfully!"
        );
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Wrong Happened");
      });
  };

  useEffect(() => {
    fetchMembership();
  }, []);

  const handleAddMemberShip = async () => {
    await axios
      .post("http://localhost:4000/plans/add-membership", inputField, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Wrong Happened");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 p-4">
      <div className="relative bg-white/10 rounded-2xl p-6 max-w-xl w-full shadow-2xl transform transition-transform duration-300 hover:scale-105">
        <button
          className="absolute top-3 right-3 cursor-pointer text-white hover:text-red-500 transition-colors"
          onClick={handleClose}
        >
          <X size={20} />
        </button>
        <h2 className="text-white text-2xl font-semibold mb-6">Membership</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {membership.map((item) => (
            <div key={item._id} className="rounded-xl p-4 text-white text-center bg-black/60">
              <p className="font-medium text-lg">{item.title} - {item.months} Months</p>
              <p className="text-sm">Rs {item.price}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
          <input
            value={inputField.title}
            onChange={(e) => handleOnChange(e, "title")}
            type="text"
            placeholder="Title (e.g. Basic, Full Access)"
            className="flex-1 p-2 rounded-xl bg-zinc-800 text-white placeholder-gray-400"
          />
          <input
            value={inputField.months}
            onChange={(e) => handleOnChange(e, "months")}
            type="number"
            placeholder="No. of Months"
            className="flex-1 p-2 rounded-xl bg-zinc-800 text-white placeholder-gray-400"
          />
          <input
            value={inputField.price}
            onChange={(e) => handleOnChange(e, "price")}
            type="number"
            placeholder="Price"
            className="flex-1 p-2 rounded-xl bg-zinc-800 text-white placeholder-gray-400"
          />
          <button
            onClick={handleAddMemberShip}
            className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer px-5 py-2 rounded-xl font-semibold shadow-md transition-all duration-300"
          >
            Add
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}


