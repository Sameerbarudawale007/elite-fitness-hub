import React, { useEffect, useState } from "react";
import Slidebar from "./Slidebar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
import MemberCard from "./Member/MemberCard";
import { motion } from "framer-motion";
import {
  getMonthlyJoined,
  threeDayExpire,
  fourToSevenDaysExpire,
  expired,
  inActiveMembers,
} from "./Data";

const GeneralUser = () => {
  const [header, setHeader] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const func = sessionStorage.getItem("func");
    functionCall(func);
    setLoading(false);
  }, []);

  const functionCall = async (func) => {
    switch (func) {
      case "monthly-joined":
        setHeader("Monthly Joined");
        var datas = await getMonthlyJoined();
        setData(datas.members);
        break;
      case "expiring-in-3-days":
        setHeader("Expiring in 3 Days");
        var datas = await threeDayExpire();
        setData(datas.members);
        break;
      case "expiring-in-4-7-days":
        setHeader("Expiring in 4-7 Days");
        var datas = await fourToSevenDaysExpire();
        setData(datas.members);
        break;
      case "expired":
        setHeader("Expired");
        var datas = await expired();
        setData(datas.members);
        break;
      case "inactive-members":
        setHeader("Inactive Members");
        var datas = await inActiveMembers();
        setData(datas.members);
        break;
    }
  };

  return (
    <div className="flex flex-col md:flex-row max-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800">
      <Slidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="mt-4 flex justify-center md:justify-start">
          <Link
            to="/dashboard"
            className="flex items-center text-gray-400 hover:text-gray-200 text-sm sm:text-base"
          >
            <ArrowBackIcon className="mr-1" />
            Back to Dashboard
          </Link>
        </div>
        <div className="mt-5 text-xl text-slate-900">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center text-orange-500 pt-4 sm:pt-6">
            {header}
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 px-4">
          {data.length === 0 ? (
            <motion.div
              className="col-span-full flex flex-col items-center justify-center min-h-[40vh] text-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.div
                className="text-orange-500 text-6xl md:text-7xl font-extrabold animate-bounce"
                whileHover={{ scale: 1.1 }}
              >
                🙁
              </motion.div>
              <p className="mt-4 text-lg md:text-2xl text-gray-600 font-medium">
                Sorry, no members found!
              </p>
            </motion.div>
          ) : (
            data.map((item, index) => <MemberCard item={item} />)
          )}
        </div>
      </main>
    </div>
  );
};

export default GeneralUser;
