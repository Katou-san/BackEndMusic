const mongoose = require("mongoose");
const playlistSchema = new mongoose.Schema(
  {
    Playlist_Id: { type: String, required: true, unique: true },
    Playlist_Name: { type: String, required: true },
    Image: { type: String, default: "" },
    Thumbnail: { type: String, default: "" },
    User_Id: { type: String, required: true },
    Playlist_Is_Publish: { type: Boolean, default: false },
    List_Song: [],
  },
  {
    timestamps: true,
  }
);

const Playlist = mongoose.model("DataPlaylist", playlistSchema);
module.exports = { Playlist };
