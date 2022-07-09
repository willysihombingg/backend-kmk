const mongoose = require("mongoose");
const user = require("./user");
const Schema = mongoose.Schema;

const letterModel = new Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  courier: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  letter_type: {
    type: String,
    enum: ["Outgoing", "Entry"],
    required: true,
  },
  note: {
    type: String,
  },
  outgoing_date: {
    type: String,
  },
  entry_date: {
    type: String,
  },
  attachment: {
    type: String,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Letter", letterModel);
