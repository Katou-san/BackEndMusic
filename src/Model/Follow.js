const mongoose = require("mongoose");
const FollowSchema = new mongoose.Schema(
  {
    Follower: { type: String, required: true },
    Following: { type: String, required: true },
    Date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Follow = mongoose.model("Follows", FollowSchema);
module.exports = { Follow };
