import React, { useEffect, useState } from "react";
import Slidebar from "../Slidebar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import Switch from "react-switch";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const MembersDetails = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("pending");
  const [renew, setRenew] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [membership, setMembership] = useState([]);
  const [planMember, setPlanmember] = useState("");

  useEffect(() => {
    fetchData();
    fetchMembership();
  }, []);

  const fetchMembership = async () => {
    await axios
      .get("http://localhost:4000/plans/get-membership", {
        withCredentials: true,
      })
      .then((res) => {
        setMembership(res.data.membership);
        setPlanmember(res.data.membership[0]._id);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrongg!!!!");
      });
  };

  const fetchData = async () => {
    await axios
      .get(`http://localhost:4000/members/get-member/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setData(res.data.member);
        setStatus(res.data.member.status);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrongg!!!!");
      });
  };

  const handleStatusChange = async () => {
    let newStatus = status === "active" ? "pending" : "active";
    await axios
      .post(
        `http://localhost:4000/members/change-status/${id}`,
        { status: newStatus },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Status Changed");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrongg!!!!");
      });
    setStatus(newStatus);
  };

  const isDateInPast = (inputData) => {
    const today = new Date();
    const givenDate = new Date(inputData);

    return givenDate < today;
  };

  const handleOnChangeSelect = (event) => {
    let value = event.target.value;
    setPlanmember(value);
  };

  const handleRenewSaveBtn = async () => {
    await axios
      .put(
        `http://localhost:4000/members/update-member-plan/${id}`,
        { membership: planMember },
        { withCredentials: true }
      )
      .then((res) => {
        setData(res.data.member);
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/member");
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Went Wrongg!!!!");
      });
  };

  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-br from-zinc-900 to-zinc-800 min-h-screen overflow-hidden">
      <Slidebar />
      <main className="flex-1 p-4 md:p-8 overflow-y-auto animate-fadeIn">
        <div className="mt-4 flex justify-center md:justify-start">
          <div
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-400 cursor-pointer hover:text-white transition duration-300 ease-in-out text-sm sm:text-base"
          >
            <ArrowBackIcon className="mr-1" />
            Go Back
          </div>
        </div>

        <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-center text-orange-500 pt-6 tracking-wide transition-colors duration-300 hover:text-white">
          Member Details 🏋️
        </h1>

        <div className="mt-10 flex flex-col lg:flex-row items-center justify-center gap-6">
          <div className="w-40 cursor-pointer sm:w-48 md:w-56 lg:w-[30%] group relative overflow-hidden rounded-2xl shadow-2xl transition-transform duration-500 hover:scale-105">
            <img
              className="w-full h-full object-cover rounded-2xl transition duration-500 group-hover:blur-[1px] group-hover:brightness-110"
              src={data?.profilePic}
              alt="Profile"
            />
          </div>

          <div className="w-full cursor-pointer lg:w-[60%] bg-zinc-900 rounded-2xl shadow-inner p-6 space-y-4 transition-all duration-700 transform hover:scale-[1.01] hover:shadow-orange-400">
            <div className="text-xl font-semibold text-white transition duration-300 hover:translate-x-1">
              📛 Name: <span className="text-gray-300">{data?.name}</span>
            </div>
            <div className="text-lg font-semibold text-white transition duration-300 hover:translate-x-1">
              📞 Phone:{" "}
              <span className="text-gray-300">{data?.phoneNumber}</span>
            </div>
            <div className="text-lg font-semibold text-white transition duration-300 hover:translate-x-1">
              🆔 Aadhaar:{" "}
              <span className="text-gray-300">{data?.aadhaarNumber}</span>
            </div>

            <div className="text-lg font-semibold text-white transition duration-300 hover:translate-x-1">
              🏠 Address: <span className="text-gray-300">{data?.address}</span>
            </div>
            <div className="text-lg font-semibold text-white transition duration-300 hover:translate-x-1">
              📅 Joined:{" "}
              <span className="text-gray-300">
                {data?.dateofJoining
                  .slice(0, 10)
                  .split("-")
                  .reverse()
                  .join("-")}
              </span>
            </div>
            <div className="text-lg font-semibold text-white transition duration-300 hover:translate-x-1">
              ⏳ Expiry:{" "}
              <span className="text-gray-300">
                {data?.nextBillDate.slice(0, 10).split("-").reverse().join("-")}
              </span>
            </div>
            <div className="flex items-center text-lg font-semibold text-white gap-3">
              ✅ Status:
              <Switch
                onChange={() => {
                  handleStatusChange();
                }}
                checked={status === "active"}
                onColor="#34D399"
                offColor="#F87171"
                uncheckedIcon={false}
                checkedIcon={false}
                height={24}
                width={48}
              />
              <span
                className={`text-sm font-bold ${
                  status === "active" ? "text-green-400" : "text-red-400"
                }`}
              >
                {status}
              </span>
            </div>

            {isDateInPast(data?.nextBillDate) && (
              <div
                onClick={() => {
                  setRenew((prev) => !prev);
                }}
                className={`mt-1 w-full md:w-1/2 text-center ${
                  renew && status === "active"
                    ? "bg-orange-500 text-black transition-all duration-300"
                    : null
                } text-white cursor-pointer font-semibold border border-orange-500 py-2 rounded-lg`}
              >
                Renew
              </div>
            )}
            {renew && status === "active" ? (
              <div className="rounded-xl p-6 mt-5 w-full max-w-md mx-auto bg-black/30 backdrop-blur-lg shadow-lg space-y-4">
                <div className="text-white text-lg font-semibold">
                  🧾 Select Membership Plan
                </div>
                <select
                  value={planMember}
                  onChange={handleOnChangeSelect}
                  className="w-full bg-zinc-800 border border-orange-400 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {membership.map((item, index) => (
                    <option key={index} value={item._id}>
                      {item.title} - {item.months} Month
                      {item.months > 1 ? "s" : ""} - ₹{item.price}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => {
                    handleRenewSaveBtn();
                  }}
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition duration-300"
                >
                  Save
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes glow {
          0% { text-shadow: 0 0 10px #ffa500; }
          50% { text-shadow: 0 0 20px #ff8c00; }
          100% { text-shadow: 0 0 10px #ffa500; }
        }

        .animate-fadeIn {
          animation: fadeIn 0.7s ease-out;
        }

        .animate-glow {
          animation: glow 2.5s ease-in-out infinite;
        }
      `}</style>
      <ToastContainer />
    </div>
  );
};

export default MembersDetails;
