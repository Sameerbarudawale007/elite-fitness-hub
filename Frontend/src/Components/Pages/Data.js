import axios from "axios";

const getMonthlyJoined = async () => {
  try {
    const res = await axios.get(
      "https://elite-fitness-hub-backend.onrender.com/members/monthly-member",
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const threeDayExpire = async () => {
  try {
    const res = await axios.get(
      "https://elite-fitness-hub-backend.onrender.com/members/within-3-days-expiring",
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const fourToSevenDaysExpire = async () => {
  try {
    const res = await axios.get(
      "https://elite-fitness-hub-backend.onrender.com/members/within-4-7-expiring",
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const expired = async () => {
  try {
    const res = await axios.get("https://elite-fitness-hub-backend.onrender.com/members/expired", {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const inActiveMembers = async () => {
  try {
    const res = await axios.get(
      "https://elite-fitness-hub-backend.onrender.com/members/inactive-member",
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export {
  getMonthlyJoined,
  threeDayExpire,
  fourToSevenDaysExpire,
  expired,
  inActiveMembers,
};
