const mongoose = require("mongoose");
const playlistSchema = new mongoose.Schema(
  {
    Playlist_Id: { type: String, required: true, unique: true },
    Playlist_Name: { type: String, required: true },
    Image: { type: String, default: "default.png" },
    Thumbnail: { type: String, default: "default.png" },
    User_Id: { type: String, required: true },
    Playlist_Is_Publish: { type: Boolean, default: false },
    List_Song: [],
  },
  {
    timestamps: true,
  }
);

const Playlist = mongoose.model("Data_Playlist", playlistSchema);
module.exports = { Playlist };
