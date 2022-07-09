const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  nim: {
    type: String,
    required: true,
  },
  department: {
    type: String,
  },
  handphone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  attachment: {
    type: String,
  },
  encripted_password: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
  status: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
