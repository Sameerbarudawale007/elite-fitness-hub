const Member = require("../Models/member");
const MemberShip = require("../Models/membership");
const jwt = require("jsonwebtoken");

exports.getAllMember = async (req, res) => {
  try {
    const { skip, limit } = req.query;
    const members = await Member.find({ gym: req.gym._id });
    const totalMember = members.length;

    const limitedMembers = await Member.find({ gym: req.gym._id })
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);
    res.status(200).json({
      message: members.length
        ? "Fetched Members Sucessfully"
        : "No any Members Registered Yet",
      members: limitedMembers,
      totalMember: totalMember,
    });
  } catch (err) {
    res.status(500).json({
      error: "Server Error",
    });
  }
};

function addMonthsToDate(months, joiningDate) {
  let today = joiningDate;
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  const futureMonth = currentMonth + months;
  const futureYear = currentYear + Math.floor(futureMonth / 12);

  const adjustedMonth = futureMonth % 12;

  const futureDate = new Date(futureYear, adjustedMonth, 1);

  const lastDayOfFutureMonth = new Date(
    futureYear,
    adjustedMonth + 1,
    0
  ).getDate();

  const adjustedDay = Math.min(currentDay, lastDayOfFutureMonth);

  futureDate.setDate(adjustedDay);

  return futureDate;
}

exports.registerMember = async (req, res) => {
  try {
    const { name, mobile, aadhaar, address, membership, file, joiningDate } =
      req.body;

    if (
      !name ||
      !mobile ||
      !aadhaar ||
      !address ||
      !membership ||
      !file ||
      !joiningDate
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!/^\d{10}$/.test(mobile)) {
      return res
        .status(400)
        .json({ error: "Mobile number must be exactly 10 digits" });
    }

    if (!/^\d{12}$/.test(aadhaar)) {
      return res
        .status(400)
        .json({ error: "Aadhaar number must be exactly 12 digits" });
    }

    const validImageExtensions = ["jpg", "jpeg", "png"];
    const ext = file.split(".").pop().toLowerCase();
    if (!validImageExtensions.includes(ext)) {
      return res
        .status(400)
        .json({ error: "Only JPG, JPEG, and PNG images are allowed" });
    }

    const existingMember = await Member.findOne({
      gym: req.gym._id,
      phoneNumber: mobile,
    });
    if (existingMember) {
      return res
        .status(409)
        .json({ error: "Already registered with this phone number" });
    }

    const membershipDoc = await MemberShip.findById(membership);
    if (!membershipDoc) {
      return res.status(409).json({ error: "No Such Membership found" });
    }

    const membershipMonth = membershipDoc.months;
    const jngDate = new Date(joiningDate);
    const nextBillDate = addMonthsToDate(membershipMonth, jngDate);

    const newmember = new Member({
      name,
      phoneNumber: mobile,
      aadhaarNumber: aadhaar,
      address,
      membership,
      gym: req.gym._id,
      profilePic: file,
      dateofJoining: jngDate,
      lastPayment: jngDate,
      nextBillDate,
    });

    await newmember.save();
    res.status(200).json({ message: "Member Registered Successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.searchMember = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const member = await Member.find({
      gym: req.gym._id,
      $or: [
        { name: { $regex: "^" + searchTerm, $options: "i" } },
        { phoneNumber: { $regex: "^" + searchTerm, $options: "i" } },
      ],
    });

    res.status(200).json({
      message: member.length
        ? "Fetched Members SuccessFully"
        : "No Such Member Registered yet",
      members: member,
      totalMembers: member.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.monthlyMember = async (req, res) => {
  try {
    const token = req.cookies.cookie_token;
    const decoded = jwt.verify(token, process.env.JWT_secretKey);
    const gym_id = decoded.gym_id;

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999
    );

    const members = await Member.find({
      gym: gym_id,
      createdAt: { $gte: startOfMonth, $lte: endOfMonth },
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: members.length
        ? "Fetched Members Successfully"
        : "No Such Member Registered yet",
      members,
      totalMembers: members.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.expiringWithin3Days = async (req, res) => {
  try {
    const token = req.cookies.cookie_token;
    const decoded = jwt.verify(token, process.env.JWT_secretKey);
    const gym_id = decoded.gym_id;

    const today = new Date();
    const nextThreeDays = new Date();
    nextThreeDays.setDate(today.getDate() + 3);

    const member = await Member.find({
      gym: gym_id,
      nextBillDate: {
        $gte: today,
        $lte: nextThreeDays,
      },
    });

    res.status(200).json({
      message: member.length
        ? "Fetched Members Successfully"
        : "No Such Member is Expiring Within 3 Days",
      members: member,
      totalMembers: member.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.expiringWithin4To7Days = async (req, res) => {
  try {
    const token = req.cookies.cookie_token;
    const decoded = jwt.verify(token, process.env.JWT_secretKey);
    const gym_id = decoded.gym_id;

    const today = new Date();
    const next4Days = new Date();
    next4Days.setDate(today.getDate() + 4);

    const next7Days = new Date();
    next7Days.setDate(today.getDate() + 7);

    const member = await Member.find({
      gym: gym_id,
      nextBillDate: {
        $gte: next4Days,
        $lte: next7Days,
      },
    });

    res.status(200).json({
      message: member.length
        ? "Fetched Members Successfully"
        : "No Such Member is Expiring Within 4 to 7 Days",
      members: member,
      totalMembers: member.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.expiredMember = async (req, res) => {
  try {
    const token = req.cookies.cookie_token;
    const decoded = jwt.verify(token, process.env.JWT_secretKey);
    const gym_id = decoded.gym_id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const member = await Member.find({
      gym: gym_id,
      status: "active",
      nextBillDate: { $lt: today },
    });

    res.status(200).json({
      message: member.length
        ? "Fetched Expired Members Successfully"
        : "No Expired Members Found",
      members: member,
      totalMembers: member.length,
    });
  } catch (err) {
    console.error("Error fetching expired members:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.inActiveMember = async (req, res) => {
  try {
    const token = req.cookies.cookie_token;
    const decoded = jwt.verify(token, process.env.JWT_secretKey);
    const gym_id = decoded.gym_id;

    const member = await Member.find({
      gym: gym_id,
      status: "pending",
    });

    res.status(200).json({
      message: member.length
        ? "Fetched Inactive Members Successfully"
        : "No Inactive Members Found",
      members: member,
      totalMembers: member.length,
    });
  } catch (err) {
    console.error("Error fetching inactive members:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getMemberDetails = async (req, res) => {
  try {
    const token = req.cookies.cookie_token;
    const decoded = jwt.verify(token, process.env.JWT_secretKey);
    const gym_id = decoded.gym_id;

    const { id } = req.params;
    const member = await Member.findOne({ _id: id, gym: gym_id });
    if (!member) {
      return res.status(400).json({
        error: "No Such Member",
      });
    }
    res.status(200).json({
      message: "Member Data Fetched Successfully",
      member: member,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const token = req.cookies.cookie_token;
    const decoded = jwt.verify(token, process.env.JWT_secretKey);
    const gym_id = decoded.gym_id;
    const { id } = req.params;
    const { status } = req.body;
    const member = await Member.findOne({ _id: id, gym: gym_id });
    if (!member) {
      return res.status(400).json({
        error: "No Such Member",
      });
    }
    member.status = status;
    await member.save();
    res.status(200).json({
      message: "Status Changed Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateMemberPlan = async (req, res) => {
  try {
    const token = req.cookies.cookie_token;
    const decoded = jwt.verify(token, process.env.JWT_secretKey);
    const gym_id = decoded.gym_id;
    const { membership } = req.body;
    const { id } = req.params;

    const memberShip = await MemberShip.findOne({
      gym: gym_id,
      _id: membership,
    });

    if (memberShip) {
      let getMonth = memberShip.months;
      let today = new Date();

      let nextBillDate = addMonthsToDate(getMonth, today);

      const member = await Member.findOne({
        gym: req.gym._id,
        _id: id,
      });

      if (!member) {
        return res.status(409).json({ error: "No such Member are there" });
      }

      member.nextBillDate = nextBillDate;
      member.lastPayment = today;

      await member.save();

      res.status(200).json({
        message: "Member Renewed Successfully",
        member,
      });
    } else {
      return res.status(409).json({ error: "No such Membership are there" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteMember = async (req, res) => {
  try {
    const result = await Member.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: "Member not found" });

    res.json({ message: "Member deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete member" });
  }
};
