const Gym = require("../tempmodels/gym");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.cookie_token;

    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    const decode = jwt.verify(token, process.env.JWT_secretKey);
    const gym = await Gym.findById(decode.gym_id).select("role");

    if (gym.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Admins only." });
    }

    req.gym = gym;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not Valid" });
  }
};

module.exports = auth;
