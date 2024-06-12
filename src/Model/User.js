const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    User_Id: { type: String, index: true, required: true, unique: true },
    User_Email: { type: String, unique: true, sparse: true },
    User_Pass: { type: String, required: true },
    User_Name: { type: String, required: true },
    Color: { type: String, default: "#ffffff" },
    Avatar: { type: String, default: "default.jpg" },
    Phone: { type: String, default: "null" },
    Role_Id: { type: String, required: true },
    CCCD: { type: String, default: "null" },
    is_Premium: { type: Boolean, default: false },
    is_Admin: { type: Boolean, default: false },
    Status: { type: String, default: 1 },
    Create_date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("Users", userSchema);
module.exports = { User };
