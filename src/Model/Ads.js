const mongoose = require("mongoose");
const AdsSchema = new mongoose.Schema(
  {
    Ads_Id: { type: String, required: true, unique: true },
    User_Id: { type: String, required: true },
    Partner_Id: { type: String, required: true },
    Ads_Name: { type: String, required: true },
    Ads_Image: { type: String, required: true },
    Ads_Audio: { type: String, required: true },
    Content: { type: String, required: true },
    is_Publish: { type: Boolean, default: false },
    Visit: { type: Number, default: 0 },
    Send_num: { type: Number, default: 0 },
    Start_time: { type: Date, default: Date.now },
    End_time: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Ads = mongoose.model("Ads", AdsSchema);
module.exports = { Ads };
