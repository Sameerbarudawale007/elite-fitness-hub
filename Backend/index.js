const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

require("./DBConnections/conn");
const PORT = process.env.PORT;
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "https://elite-fitness-hub-frontend.onrender.com/",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

const gymRoutes = require("./Routes/gym");
const MemberShipRoutes = require("./Routes/membership");
const MemberRoutes = require("./Routes/member");
app.use("/auth", gymRoutes);
app.use("/plans", MemberShipRoutes);
app.use("/members", MemberRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
