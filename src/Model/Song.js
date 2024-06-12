const mongoose = require("mongoose");
const songSchema = new mongoose.Schema(
  {
    Song_Id: { type: String, required: true, unique: true },
    Song_Name: { type: String, required: true },
    Song_Image: { type: String, default: "default.jpg" },
    Song_Audio: { type: String, required: true },
    Artist: { type: String, required: true },
    User_Id: { type: String, required: true },
    Category_Id: { type: String, default: "" },
    Lyrics: { type: String, default: "" },
    Tag: { type: String, default: "" },
    Color: { type: String, default: "#ffffff" },
    is_Publish: { type: Boolean, default: false },
    Create_Date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Song = mongoose.model("Songs", songSchema);
module.exports = { Song };
