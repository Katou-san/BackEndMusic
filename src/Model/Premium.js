const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const PremiumSchema = new mongoose.Schema(
  {
    Premium_Id: { type: String, required: true, unique: true },
    Premium_Title: { type: String, required: true },
    Price: { type: Number, required: true },
    Content: { type: String, required: true },
    Storage: { type: Number, required: true },
    Duration: { type: Number, required: true },
    Status: { type: Boolean, required: true, default: true },
    Create_Date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Premium = mongoose.model("Premiums", PremiumSchema);
module.exports = { Premium };
