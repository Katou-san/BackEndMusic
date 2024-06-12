const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const RepostSchema = new mongoose.Schema(
  {
    Repost_Id: { type: String, required: true, unique: true },
    Song_Id: { type: String, required: true },
    User_Id: { type: String, required: true },
    Post_Time: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Repost = mongoose.model("Reposts", RepostSchema);
module.exports = { Repost };
