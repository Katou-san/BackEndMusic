const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    Id: { type: String, index: true, required: true, unique: true },
    Email: { type: String, unique: true, sparse: true },
    Pass: { type: String, required: true },
    Name: { type: String, required: true },
    Avatar: { type: String, default: " " },
    NumberPhone: { type: String, default: " " },
    isAdmin: { type: Boolean, default: false, required: true },
    PlaylistUser: [],
    ListAddSongs: [],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("DataUser", userSchema);
module.exports = { User };
