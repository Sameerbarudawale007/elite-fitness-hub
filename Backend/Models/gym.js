const mongoose = require("mongoose");

const gymSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    enum:["admin","user"],
    default:"user"
  }
},{timestamps: true});

const model = mongoose.model("Gym", gymSchema);
module.exports = model;
