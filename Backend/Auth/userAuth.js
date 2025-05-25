const jwt = require("jsonwebtoken");
const Gym = require("../models/gym");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.cookie_token;

    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    const decode = jwt.verify(token, process.env.JWT_secretKey);

    const gym = await Gym.findById(decode.gym_id).select("_id role");

    if (!gym) {
      return res.status(404).json({ error: "Gym not found" });
    }

    if (gym.role !== "user" && gym.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    req.gym = gym;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Token is not Valid" });
  }
};

module.exports = userAuth;
