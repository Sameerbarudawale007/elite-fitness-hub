import React, { useEffect, useState } from "react";
import Slidebar from "../Slidebar";
import { Link, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MemberCard from "./MemberCard";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Members = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [isSearchModeOn, setIsSearchModeOn] = useState(false);

  const handleMemberShip = () => {
    setAddmembership((prev) => !prev);
  };

  const [startFrom, setStartFrom] = useState(0);
  const [endTo, setEndTo] = useState(9);
  const [totalData, setTotalData] = useState(0);

  const [noOfPages, setNoOfPages] = useState(0);
  const [limit, setLimit] = useState(9);

  useEffect(() => {
    fetchData(0, 9);
  }, []);

  const fetchData = async (skip, limits) => {
    await axios
      .get(
        `http://localhost:4000/members/all-member?skip=${skip}&limit=${limits}`,
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        let totalData = res.data.totalMember;
        setTotalData(totalData);
        setData(res.data.members);

        let extraPages = totalData % limit === 0 ? 0 : 1;
        let totalPage = parseInt(totalData / limit) + extraPages;
        setNoOfPages(totalPage);

        if (totalData === 0) {
          setStartFrom(-1);
          setEndTo(0);
        } else if (totalData < 10) {
          setStartFrom(0);
          setEndTo(totalData);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something Technical Fault");
      });
  };

  const handlePrev = () => {
    if (currentPage !== 1) {
      let currPage = currentPage - 1;
      setCurrentPage(currPage);
      var from = (currPage - 1) * 9;
      var to = currPage * 9;
      setStartFrom(from);
      setEndTo(to);
      let skipValue = skip - 9;
      setSkip(skipValue);
      fetchData(skipValue, 9);
    }
  };

  const handleNext = () => {
    if (currentPage !== noOfPages) {
      let currPage = currentPage + 1;
      setCurrentPage(currPage);
      var from = (currPage - 1) * 9;
      var to = currPage * 9;
      if (to > totalData) {
        to = totalData;
      }
      setStartFrom(from);
      setEndTo(to);
      let skipValue = skip + 9;
      setSkip(skipValue);
      fetchData(skipValue, 9);
    }
  };

  const handleSearchData = async () => {
    if (search !== "") {
      setIsSearchModeOn(true);
      await axios
        .get(
          `http://localhost:4000/members/searched-members?searchTerm=${search}`,
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res);
          setData(res.data.members);
          setTotalData(res.data.totalMembers);
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something Technical Fault");
        });
    } else {
      toast.error("Please Enter any Value!!");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row max-h-screen bg-gradient-to-br from-zinc-900 to-zinc-800">
      <Slidebar />

      <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-center text-orange-500 pt-4 sm:pt-6">
          Gym Members
        </h1>

        <div className="mt-6 flex justify-between items-center w-full">
          <button
            onClick={() => navigate("/add-members")}
            className="bg-red-500 cursor-pointer text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow hover:bg-orange-600 transition-all duration-300 text-sm sm:text-base"
          >
            Add Members
          </button>
          <div className="flex-1"></div> {/* Acts as the gap between */}
          <button
            onClick={() => navigate("/add-membership")}
            className="bg-red-500 cursor-pointer text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow hover:bg-orange-600 transition-all duration-300 text-sm sm:text-base"
          >
            MemberShip <AddIcon />
          </button>
        </div>

        <div className="mt-4 flex justify-center md:justify-start">
          <Link
            to="/dashboard"
            className="flex items-center text-gray-400 hover:text-gray-200 text-sm sm:text-base"
          >
            <ArrowBackIcon className="mr-1" />
            Back to Dashboard
          </Link>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 w-full max-w-md mx-auto md:mx-0">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Name or Mobile No"
            className="w-full bg-zinc-800 text-white px-4 py-2 border border-gray-600 sm:border-gray-400 rounded-lg text-sm sm:text-base focus:outline-none focus:ring focus:ring-orange-500"
          />
          <button
            onClick={() => handleSearchData()}
            className="bg-orange-500 cursor-pointer text-white p-2 rounded-lg hover:bg-orange-600 transition duration-300"
          >
            <SearchIcon />
          </button>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center text-white text-sm sm:text-base gap-4">
          <div>Total Members {isSearchModeOn ? totalData : null}</div>
          {!isSearchModeOn ? (
            <div className="flex items-center gap-3 cursor-pointer">
              <span>
                {startFrom + 1}-{endTo} of {totalData} Members
              </span>
              <div
                className={`w-8 hover:scale-105 h-8 cursor-pointer border-2 flex justify-center items-center rounded-full hover:bg-orange-500 duration-300 transition ${
                  currentPage === 1 ? "bg-zinc-800 text-white" : null
                }`}
                onClick={() => {
                  handlePrev();
                }}
              >
                <KeyboardArrowLeftIcon />
              </div>
              <div
                className={`w-8 hover:scale-105 h-8 cursor-pointer border-2 flex justify-center items-center rounded-full hover:bg-orange-500 duration-300 transition ${
                  currentPage === noOfPages ? "bg-zinc-800 text-white" : null
                }`}
                onClick={() => {
                  handleNext();
                }}
              >
                <KeyboardArrowRightIcon />
              </div>
            </div>
          ) : null}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {data.map((item, index) => {
            return <MemberCard item={item} key={index} />;
          })}
        </div>
      </main>
      <ToastContainer />
    </div>
  );
};

export default Members;
