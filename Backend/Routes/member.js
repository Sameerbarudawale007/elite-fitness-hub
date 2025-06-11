const express = require("express");
const router = express.Router();
const MemberControllers = require("../Controllers/member");
const auth = require("../Auth/auth");
const userAuth = require("../Auth/userAuth");

router.get("/all-member", userAuth, MemberControllers.getAllMember);
router.post("/register-member", userAuth, MemberControllers.registerMember);
router.get("/searched-members", auth, MemberControllers.searchMember);

router.get("/monthly-member", auth, MemberControllers.monthlyMember);
router.get(
  "/within-3-days-expiring",
  auth,
  MemberControllers.expiringWithin3Days
);
router.get(
  "/within-4-7-expiring",
  auth,
  MemberControllers.expiringWithin4To7Days
);
router.get("/expired", auth, MemberControllers.expiredMember);
router.get("/inactive-member", auth, MemberControllers.inActiveMember);

router.get("/get-member/:id", auth, MemberControllers.getMemberDetails);
router.post("/change-status/:id", auth, MemberControllers.changeStatus);
router.put("/update-member-plan/:id", auth, MemberControllers.updateMemberPlan);
router.delete("/delete-member/:id", auth, MemberControllers.deleteMember);

module.exports = router;
