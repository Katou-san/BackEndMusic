const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    User_Id: { type: String, index: true, required: true, unique: true },
    User_Email: { type: String, unique: true, sparse: true },
    User_Pass: { type: String, required: true },
    User_Name: { type: String, required: true },
    User_Color: { type: String, default: "#ffffff" },
    Avatar: { type: String, default: "Avatar_Default.jpg" },
    Number_Phone: { type: String, default: "" },
    Follower: { type: Number, default: 0 },
    Following: { type: Number, default: 0 },
    Playlist: [],
    List_Add_Songs: [],
    List_Like_Song: [],
    Roles: { type: String, default: "" },
    is_Premium: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Data_User", userSchema);
module.exports = { User };
