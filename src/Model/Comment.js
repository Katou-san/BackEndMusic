const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema(
  {
    Comment_Id: { type: String, required: true, unique: true },
    Song_Id: { type: String, required: true },
    User_Id: { type: String, required: true },
    Content: { type: String, required: true },
    Post_Time: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comments", CommentSchema);
module.exports = { Comment };
