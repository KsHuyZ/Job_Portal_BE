const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const notificationSchema = new mongoose.Schema({
  jobId: {
    type: ObjectId,
    ref: "Job",
    required: true,
  },
  toUser: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["ACCEPTED", "REJECTED"],
    required: true,
  },
  seen: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Notification", notificationSchema);