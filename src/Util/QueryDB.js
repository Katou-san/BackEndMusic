const join = (Table, Id, foreign_Id, as_Name) => {
  return {
    $lookup: {
      as: as_Name,
      from: Table,
      localField: Id,
      foreignField: foreign_Id,
    },
  };
};

// const result = await Playlist.aggregate([
//   {
//     $lookup: {
//       from: "tracks",
//       localField: "Playlist_Id",
//       foreignField: "Playlist_Id",
//       as: "PlaylistSong",
//     },
//   },
//   {
//     $project: {
//       _id: 0,
//       Playlist_Id: 1,
//       Playlist_Name: 1,
//       Artist: 1,
//       Image: 1,
//       User_Id: 1,
//       is_Publish: 1,
//       Tracks: "$PlaylistSong.Song_Id",
//     },
//   },
// ]);

const match = (Name, Value) => {
  let temp = {};
  temp[Name] = Value;
  return {
    $match: temp,
  };
};

module.exports = { join, match };
