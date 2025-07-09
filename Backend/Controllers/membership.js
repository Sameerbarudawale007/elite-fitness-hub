const MemberShip = require("../tempmodels/membership");

exports.addMemberShip = async (req, res) => {
  try {
    const { months, price, title } = req.body;

    const existing = await MemberShip.findOne({
      gym: req.gym._id,
      months,
      title,
    });

    if (existing) {
      existing.price = price;
      await existing.save();
      return res.status(200).json({ message: "Updated Successfully" });
    }

    const newMembership = new MemberShip({
      months,
      price,
      title,
      gym: req.gym._id,
    });

    await newMembership.save();

    res.status(200).json({
      message: "Added Successfully",
      data: newMembership,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

exports.getmembership = async (req, res) => {
  try {
    let memberships;

    if (req.gym.role === "admin") {
      // Admin: fetch memberships added by this admin's gym only
      memberships = await MemberShip.find({ gym: req.gym._id });
    } else {
      // User: fetch all memberships (common list created by admins)
      memberships = await MemberShip.find();
    }

    res.status(200).json({
      message: "Membership Fetched Successfully",
      membership: memberships,
    });
  } catch (err) {
    console.error("Error fetching memberships:", err);
    res.status(500).json({ error: "Server Error" });
  }
};
