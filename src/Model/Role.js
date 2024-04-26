const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema({
  Role_Id: { type: String, required: true, unique: true },
  Role_Name: { type: String, required: true, unique: true },
  Description: { type: String, default: "" },
});

const Role = mongoose.model("Data_Role", roleSchema);
module.exports = { Role };
