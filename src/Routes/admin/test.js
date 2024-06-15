const { Db } = require("mongodb");

Db.Playlist.aggregate([
  {
    $lookup: {
      from: "Track",
      let: { Playlist_Id: "Playlist_Id" },
      localField: "Playlist_Id",
      foreignField: "Playlist_Id",
      pipeline: [{ $project: { _id: 0, Song_Id: 1 } }],
      as: "PlaylistSong",
    },
  },
]);
