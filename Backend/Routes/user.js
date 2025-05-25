const express = require("express");
const router = express.Router();
const MemberControllers = require("../Controllers/member");
const userAuth = require("../middleware/userAuth");

router.post("/enroll", userAuth, MemberControllers.registerMember);

module.exports = router;
