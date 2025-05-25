const express = require("express");
const router = express.Router();
const gymController = require("../Controllers/gym");

router.post("/register", gymController.register);
router.post("/login", gymController.login);
router.post("/logout", gymController.logout);
module.exports = router;
