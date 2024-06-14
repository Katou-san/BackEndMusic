const mongoose = require("mongoose");
const LikeSchema = new mongoose.Schema(
  {
    Topic_Id: { type: String, required: true, unique: true },
    State: { type: Number, required: true, default: 0 },
    User_Id: { type: String, required: true },
    Type: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.model("Like", LikeSchema);
module.exports = { Like };
