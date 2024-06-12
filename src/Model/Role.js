const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema(
  {
    Role_Id: { type: String, required: true, unique: true },
    Role_Name: { type: String, required: true, unique: true },
    Description: { type: String, default: "" },
    Create_Date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model("Roles", roleSchema);
module.exports = { Role };
