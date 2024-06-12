const mongoose = require("mongoose");
const playlistSchema = new mongoose.Schema(
  {
    Playlist_Id: { type: String, required: true, unique: true },
    Playlist_Name: { type: String, required: true },
    Artist: { type: String, required: true },
    Image: { type: String, default: "default.png" },
    Thumbnail: { type: String, default: "default.png" },
    User_Id: { type: String, required: true },
    is_Publish: { type: Boolean, default: false },
    type: { type: Number, required: true, default: 0 },
    Create_Date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const Playlist = mongoose.model("Playlists", playlistSchema);
module.exports = { Playlist };
