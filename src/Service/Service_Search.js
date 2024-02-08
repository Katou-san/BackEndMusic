const { Category } = require("../Model/Category");
const { Playlist } = require("../Model/Playlist");
const { User } = require("../Model/User");
const { Song } = require("../Model/Song");

const Search_All = (Value) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Search_Song = await Song.find({
        Song_Name: { $regex: Value, $options: "i" },
        Is_Publish: true,
      })
        .sort({ Like: -1 })
        .select({
          _id: 0,
          Song_Id: 1,
        });

      const Search_Artist = await User.find({
        User_Name: { $regex: Value, $options: "i" },
      })
        .sort({ Follower: -1 })
        .select({ _id: 0, User_Name: 1, Avatar: 1 });

      const Search_Playlist = await Playlist.find({
        Playlist_Name: { $regex: Value, $options: "i" },
        Playlist_Is_Publish: true,
      }).select({
        _id: 0,
        Playlist_Name: 1,
        Thumbnail: 1,
        User_Id: 1,
        Image: 1,
      });

      resolve({
        status: "200",
        message: "Search complete",
        data: {
          List_Song: Search_Song.map((item) => {
            return item.Song_Id;
          }),
          List_Artist: Search_Artist,
          List_Playlist: Search_Playlist,
        },
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  Search_All,
};
