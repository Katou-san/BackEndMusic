const mongoose = require("mongoose");
const PartnerSchema = new mongoose.Schema(
  {
    Partner_Id: { type: String, required: true },
    Partner_Name: { type: String, required: true },
    Logo: { type: String, required: true },
    Partner_Image: { type: String, required: true },
    Partner_Audio: { type: String, required: true },
    Link: { type: String, required: true },
    Title: { type: String, required: true },
    Content: { type: String, required: true },
    User_Id: { type: String, required: true },
    Type: { type: Number, required: true },
    Create_Date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Partner = mongoose.model("partners", PartnerSchema);
module.exports = { Partner };
