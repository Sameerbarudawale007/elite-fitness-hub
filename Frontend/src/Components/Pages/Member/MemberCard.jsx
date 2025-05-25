import React from "react";
import { Link } from "react-router-dom";

const MemberCard = ({ item }) => {
  return (
    <Link
      to={`/member/${item?._id}`}
      className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-gray-700 rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer max-w-full"
    >
      <div className="relative flex justify-center items-center pt-6">
        <div className="w-24 h-24 rounded-full relative">
          <img
            src={item?.profilePic}
            alt="Profile"
            className="w-full h-full object-cover rounded-full transition duration-300 ease-in-out transform hover:scale-110"
          />
          <span
            className={`absolute top-1 left-1 w-4 h-4 ${
              item?.status === "active" ? "bg-green-500" : "bg-red-500"
            } border border-zinc-900 rounded-full z-10`}
          />
        </div>
      </div>
      <div className="p-4 text-center">
        <p className="text-white text-base font-semibold">{item?.name}</p>
        <p className="text-gray-400 text-sm mt-2">
          📞 {"+91 " + item?.phoneNumber}
        </p>
        <p className="text-gray-400 text-sm mt-2">
          🆔 Aadhaar: {item?.aadhaarNumber}
        </p>
        <p className="text-gray-400 text-sm mt-2">
          🏠 Address: {item?.address}
        </p>
        <p className="text-gray-400 text-xl mt-2">
          📅 Joined:{" "}
          {item?.dateofJoining.slice(0, 10).split("-").reverse().join("-")}
        </p>
        <p className="text-gray-400 text-xl mt-2">
          ⏳ Expiry:{" "}
          {item?.nextBillDate.slice(0, 10).split("-").reverse().join("-")}
        </p>
      </div>
    </Link>
  );
};

export default MemberCard;
