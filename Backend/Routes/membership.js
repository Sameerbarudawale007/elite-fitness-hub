const express = require("express");
const router = express.Router();
const MemberShipController = require("../Controllers/membership");
const auth = require("../Auth/auth");
const userAuth = require("../Auth/userAuth");

router.post("/add-membership", userAuth, MemberShipController.addMemberShip);
router.get("/get-membership", userAuth, MemberShipController.getmembership);

module.exports = router;
