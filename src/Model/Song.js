const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const songSchema = new mongoose.Schema(
  {
    Song_Id: { type: String, required: true, unique: true },
    Song_Name: { type: String, required: true },
    Song_Image: { type: String, default: "" },
    Song_Src: { type: String, default: "" },
    Like: { type: Number, default: 0 },
    User_Id: { type: String, required: true },
    Category_Id: { type: String, default: "" },
    Lyrics: { type: String, default: "" },
    Tag: { type: String, default: "" },
    Color: { type: String, default: "#ffffff" },
    Is_Publish: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Song = mongoose.model("DataSong", songSchema);
module.exports = { Song };
