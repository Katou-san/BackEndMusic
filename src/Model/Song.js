const { Int32 } = require("mongodb");
const mongoose = require("mongoose");
const songSchema = new mongoose.Schema(
  {
    Id: { type: String, required: true, unique: true },
    Name: { type: String, required: true },
    Avatar: { type: String, default: "" },
    Like: { type: Number, default: 0 },
    IdUser: { type: String, default: "" },
    CatalogyID: { type: String, default: "" },
    Lyric: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const Song = mongoose.model("DataSong", songSchema);
module.exports = { Song };
