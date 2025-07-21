const Gym = require("../tempmodels/gym");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }

    const isExist = await Gym.findOne({ userName });
    if (isExist) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const isAdminExists = await Gym.findOne({ role: "admin" });

    const gym = new Gym({
      userName,
      email,
      password: hashedPassword,
      role: isAdminExists ? "user" : "admin",
    });

    await gym.save();

    res.status(201).json({
      message: "Signup successful",
      sucess: "yes",
      data: gym,
    });
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
      let gymIdToUse;

      if (gym.role === "admin") {
        gymIdToUse = gym._id;
      } else {
        const adminGym = await Gym.findOne({ role: "admin" });
        if (!adminGym) {
          return res.status(500).json({ error: "Admin not found" });
        }
        gymIdToUse = adminGym._id;
      }

      const token = jwt.sign({ gym_id: gymIdToUse }, process.env.JWT_secretKey);
      res.cookie("cookie_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
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
