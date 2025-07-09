const mongoose = require("mongoose");

const MembershipSchema = new mongoose.Schema(
  {
    months: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true, // "Basic", "Premium", "Full Access"
    },
    gym: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Gym",
      required: true,
    },
  },
  { timestamps: true }
);

const modelMembership = mongoose.model("membership", MembershipSchema);
module.exports = modelMembership;
