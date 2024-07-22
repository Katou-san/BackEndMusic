const { Playlist } = require("../Model/Playlist");
const { Song } = require("../Model/Song");
const { User } = require("../Model/User");

//todo done!
const SV__Search_All = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Search_Song = await Song.find({
        Song_Name: { $regex: name, $options: "i" },
        is_Publish: true,
      }).limit(5);

      const Search_Artist = await User.find({
        User_Name: { $regex: name, $options: "i" },
      }).limit(5);

      const Search_Playlist = await Playlist.find({
        Playlist_Name: { $regex: name, $options: "i" },
        is_Publish: true,
        Type: 1,
      }).limit(5);

      const Search_Album = await Playlist.find({
        Playlist_Name: { $regex: name, $options: "i" },
        is_Publish: true,
        Type: 2,
      }).limit(5);

      resolve({
        status: 200,
        message: "get all subscriptions complete!",
        data: {
          Song: Search_Song,
          Playlist: Search_Playlist,
          Album: Search_Album,
          Artist: Search_Artist,
        },
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Subscription.js (SV_Get_Subscription)",
      });
      throw new Error(err);
    }
  });
};

module.exports = {
  SV__Search_All,
};
