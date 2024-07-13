const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const TrackSchema = new mongoose.Schema({
  Song_Id: { type: String, required: true },
  Playlist_Id: { type: String, required: true },
});

const Track = mongoose.model("Tracks", TrackSchema);
module.exports = { Track };
