import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Slidebar from "./Slidebar";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ErrorIcon from "@mui/icons-material/Error";
import ReportIcon from "@mui/icons-material/Report";
import BlockIcon from "@mui/icons-material/Block";

const cards = [
  {
    icon: <PeopleRoundedIcon sx={{ fontSize: 50 }} />,
    label: "Joined Members",
    route: "/member",
  },
  {
    icon: <SignalCellularAltIcon sx={{ fontSize: 50 }} />,
    label: "Monthly Joined",
    route: "/specific/monthly-joined",
    val: "monthly-joined",
  },
  {
    icon: <AccessAlarmIcon sx={{ fontSize: 50 }} />,
    label: "Expiring in 3 Days",
    route: "/specific/expiring-in-3-days",
    val: "expiring-in-3-days",
  },
  {
    icon: <ErrorIcon sx={{ fontSize: 50 }} />,
    label: "Expiring in 4-7 Days",
    route: "/specific/expiring-in-4-7-days",
    val: "expiring-in-4-7-days",
  },
  {
    icon: <ReportIcon sx={{ fontSize: 50 }} />,
    label: "Expired",
    route: "/specific/expired",
    val: "expired",
  },
  {
    icon: <BlockIcon sx={{ fontSize: 50 }} />,
    label: "Inactive Members",
    route: "/specific/inactive-members",
    val: "inactive-members",
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = (route) => {
    if (route) {
      navigate(route);
    }
  };

  const handleOnClickMenu = (val) => {
    sessionStorage.setItem("func", val);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800">
      <Slidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl md:text-6xl font-bold text-center text-orange-500 pt-8">
          Dashboard
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 md:mt-28">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => {
                handleCardClick(card.route);
                handleOnClickMenu(card.val);
              }}
              className="group bg-gradient-to-br from-zinc-900 to-zinc-800 w-full h-fit border cursor-pointer border-gray-300 rounded-xl shadow-md bg-white dark:bg-zinc-800 hover:shadow-xl transition-transform transform hover:scale-105 duration-300 ease-in-out"
            >
              <div className="h-2 rounded-t-xl bg-gradient-to-r from-indigo-500 to-purple-600"></div>
              <div className="p-6 text-center">
                <div className="mb-4 text-indigo-600 dark:text-indigo-300 animate-pulse">
                  {card.icon}
                </div>
                <p className="text-lg font-semibold text-white">{card.label}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
