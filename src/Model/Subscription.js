const mongoose = require("mongoose");
const SubscriptionSchema = new mongoose.Schema(
  {
    Sub_Id: { type: String, required: true, unique: true },
    Sub_Title: { type: String, required: true },
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

const Subscription = mongoose.model("Subscriptions", SubscriptionSchema);
module.exports = { Subscription };
