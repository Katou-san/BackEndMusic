const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    Id: { type: String, required: true },
    Email: { type: String, index: true, unique: true, sparse: true },
    Pass: { type: String, required: true, default: " " },
    Name: { type: String, required: true, default: " " },
    Avatar: { type: String, default: " " },
    NumberPhone: { type: String, default: " " },
    isAdmin: { type: Boolean, default: false, required: true },
    Follower: [],
    Following: [],
    PlaylistUser: [],
    ListAddSongs: [],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("DataUser", userSchema);
module.exports = { User };
