const Gym = require("../models/gym");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { userName, email, password, profilePic } = req.body;

    const isExist = await Gym.findOne({ userName });
    if (isExist) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 👉 Check if any admin exists
    const isAdminExists = await Gym.findOne({ role: "admin" });

    const gym = new Gym({
      userName,
      email,
      password: hashedPassword,
      profilePic,
      role: isAdminExists ? "user" : "admin", // ✅ First signup = admin, rest = user
    });

    await gym.save();

    res
      .status(201)
      .json({ message: "Signup successful", sucess: "yes", data: gym });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const gym = await Gym.findOne({ userName });

    if (gym && (await bcrypt.compare(password, gym.password))) {
      // 👇 STEP 1: Get the correct gym_id to put in the token
      let gymIdToUse;

      if (gym.role === "admin") {
        gymIdToUse = gym._id; // if admin logs in, use their own ID
      } else {
        // if user logs in, get the admin's ID
        const adminGym = await Gym.findOne({ role: "admin" });
        if (!adminGym) {
          return res.status(500).json({ error: "Admin not found" });
        }
        gymIdToUse = adminGym._id;
      }

      // 👇 STEP 2: create token with the correct (admin) gym ID
      const token = jwt.sign({ gym_id: gymIdToUse }, process.env.JWT_secretKey);
      res.cookie("cookie_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
      });

      res.json({
        message: "Logged in Successfully",
        success: "true",
        gym,
        token,
      });
    } else {
      res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.logout = async (req, res) => {
  res
    .clearCookie("cookie_token", cookieOptions)
    .json({ message: "Logged out sucessfully" });
};
