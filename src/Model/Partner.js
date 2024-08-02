const mongoose = require("mongoose");
const PartnerSchema = new mongoose.Schema(
  {
    Partner_Id: { type: String, required: true, unique: true },
    Partner_Name: { type: String, required: true, unique: true },
    Phone: { type: String, required: true },
    Logo: { type: String, required: true },
    Contract_num: { type: String, required: true, unique: true },
    Status: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Partner = mongoose.model("partners", PartnerSchema);
module.exports = { Partner };
