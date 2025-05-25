import React, { useEffect, useState } from "react";
import Logo from "../Pages/Logo.jpeg";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation } from "react-router-dom";

const Slidebar = () => {
  const [greeting, setGreeting] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) setGreeting("Good Morning 🌅");
    else if (currentHour < 18) setGreeting("Good Afternoon 🌞");
    else if (currentHour < 22) setGreeting("Good Evening 🌇");
    else setGreeting("Good Night 🌃");
  }, []);

  const menuItems = [
    { icon: <HomeRoundedIcon />, label: "Dashboard", path: "/dashboard" },
    { icon: <PeopleRoundedIcon />, label: "Members", path: "/member" },
    { icon: <ExitToAppRoundedIcon />, label: "Logout", path: "/" },
  ];

  return (
    <>
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <CloseIcon className="text-white" />
          ) : (
            <MenuIcon className="text-white" />
          )}
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 w-64 bg-gradient-to-br from-zinc-900 to-zinc-800 h-[100vh] shadow-lg z-40 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:flex md:flex-col md:w-1/4 lg:w-1/5 p-6 border-r border-zinc-800`}
      >
        <div className="flex flex-col items-center mb-6">
          <div className="relative group w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 p-1 shadow-xl">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-zinc-700">
              <img
                src={Logo}
                alt="Gym Logo"
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold tracking-wide text-white dark:text-white">
            Tiger Gym
          </div>
          <div className="text-sm text-white">{greeting}</div>
          <div className="text-sm font-medium mt-1 text-orange-500 dark:text-white">
            Admin 👨‍💼
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {menuItems.map((item, idx) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                to={item.path}
                key={idx}
                className={`flex items-center gap-4 px-4 py-3 rounded-lg text-white cursor-pointer transition-all duration-300 hover:scale-105 ease-in-out ${
                  isActive ? "bg-indigo-500" : "bg-zinc-800 hover:bg-indigo-500"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Slidebar;
