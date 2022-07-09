const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventModel = new Schema({
  event_name: {
    type: String,
    required: true,
  },
  chairman: {
    type: String,
    required: true,
  },
  participant: {
    type: String,
  },
  handphone: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  place: {
    type: String,
  },
  date: {
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

module.exports = mongoose.model("Event", eventModel);
