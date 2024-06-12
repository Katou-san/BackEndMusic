const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const ReplySchema = new mongoose.Schema(
  {
    Reply_Id: { type: String, required: true, unique: true },
    Comment_Id: { type: String, required: true },
    User_Id: { type: String, required: true },
    Content: { type: String, required: true },
    Post_Time: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Reply = mongoose.model("Replys", ReplySchema);
module.exports = { Reply };
