const mongoose = require("mongoose");
const playlistSchema = new mongoose.Schema(
  {
    Id: { type: String, required: true, unique: true },
    Name: { type: String, required: true },
    Avatar: { type: String, default: "" },
    IdUser: { type: String, default: "" },
    Songs: [],
  },
  {
    timestamps: true,
  }
);

const Playlist = mongoose.model("DataPlaylist", playlistSchema);
module.exports = { Playlist };
