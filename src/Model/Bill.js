const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const BillSchema = new mongoose.Schema(
  {
    Bill_Id: { type: String, required: true, unique: true },
    User_Id: { type: String, required: true },
    Sub_Id: { type: String, required: true },
    Create_Date: { type: Date, default: Date.now },
    Expiration_Date: { type: Date, require: true },
  },
  {
    timestamps: true,
  }
);

const Bill = mongoose.model("Bills", BillSchema);

module.exports = { Bill };
