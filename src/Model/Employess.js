const mongoose = require("mongoose");
const EmployessSchema = new mongoose.Schema(
  {
    Employess_Id: { type: String, required: true, unique: true },
    Employess_Email: { type: String, unique: true, sparse: true },
    Employess_Name: { type: String, required: true, sparse: true },
    Avatar: { type: String, default: "Avatar_Default.jpg" },
    Employess_Pass: { type: String, required: true },
    Role: { type: String, default: "" },
    Number_Phone: { type: String, default: "" },
    Status: { type: String, default: "active" },
  },
  {
    timestamps: true,
  }
);

const Employess = mongoose.model("Data_Emloyess", EmployessSchema);
module.exports = { Employess };
