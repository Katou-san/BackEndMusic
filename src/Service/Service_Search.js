const { Playlist } = require("../Model/Playlist");
const { Song } = require("../Model/Song");
const { User } = require("../Model/User");

const SearchUser = (name, limit = 5) => {
  return [
    {
      $match: {
        $and: [
          {
            $or: [
              { $text: { $search: name } },
              { User_Name: RegExp(name, "i") },
            ],
          },
          { is_Admin: false, Status: 1 },
        ],
      },
    },
    {
      $lookup: {
        from: "follows",
        localField: "User_Id",
        foreignField: "Following",
        as: "follower_list",
      },
    },
    {
      $project: {
        _id: 0,
        User_Id: 1,
        User_Email: 1,
        User_Name: 1,
        Color: 1,
        Avatar: 1,
        Role_Id: 1,
        Create_date: 1,
        follower: { $size: "$follower_list" },
      },
    },
    { $sort: { follower: -1 } },
    { $limit: limit },
  ];
};

const SearchSong = (value, limit = 5) => {
  return [
    {
      $match: {
        $and: [
          {
            $or: [
              { $text: { $search: value } },
              { Song_Name: RegExp(value, "i") },
            ],
          },
          { is_Publish: true },
        ],
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "User_Id",
        foreignField: "User_Id",
        as: "User",
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "Song_Id",
        foreignField: "Topic_Id",
        as: "like_list",
      },
    },
    {
      $lookup: {
        from: "artists",
        localField: "Artist",
        foreignField: "Artist_Id",
        as: "artist_a",
      },
    },
    {
      $unwind: {
        path: "$like_list",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: {
          Song_Id: "$Song_Id",
          Song_Name: "$Song_Name",
          Song_Image: "$Song_Image",
          Song_Audio: "$Song_Audio",
          Artist: "$Artist",
          User_Id: "$User_Id",
          Category_Id: "$Category_Id",
          Lyrics: "$Lyrics",
          Tag: "$Tag",
          Color: "$Color",
          is_Publish: "$is_Publish",
          Create_Date: "$Create_Date",
          User_Name: {
            $first: "$User.User_Name",
          },
          Artist_Name: {
            $first: "$artist_a.Artist_Name",
          },
        },
        like: { $sum: "$like_list.State" },
      },
    },
    {
      $project: {
        _id: 0,
        Song_Id: "$_id.Song_Id",
        Song_Name: "$_id.Song_Name",
        Song_Image: "$_id.Song_Image",
        Song_Audio: "$_id.Song_Audio",
        Artist: "$_id.Artist",
        User_Id: "$_id.User_Id",
        Category_Id: "$_id.Category_Id",
        Lyrics: "$_id.Lyrics",
        Tag: "$_id.Lyrics",
        Color: "$_id.Color",
        is_Publish: "$_id.is_Publish",
        Create_Date: "$_id.Create_Date",
        User_Name: "$_id.User_Name",
        Artist_Name: "$_id.Artist_Name",
        like: 1,
      },
    },
    { $sort: { like: -1 } },
    { $limit: limit },
  ];
};

const SearchPlaylist = (value, limit = 5, type = 1) => {
  return [
    {
      $match: {
        $and: [
          {
            $or: [
              { $text: { $search: value } },
              { Playlist_Name: RegExp(value, "i") },
            ],
          },
          { is_Publish: true, Type: type },
        ],
      },
    },
    {
      $lookup: {
        from: "tracks",
        localField: "Playlist_Id",
        foreignField: "Playlist_Id",
        as: "track_list",
      },
    },
    {
      $match: {
        track_list: { $gt: { $size: 1 } },
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "Playlist_Id",
        foreignField: "Topic_Id",
        as: "Like_list",
      },
    },
    {
      $unwind: {
        path: "$Like_list",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: {
          Playlist_Id: "$Playlist_Id",
          Playlist_Name: "$Playlist_Name",
          Artist: "$Artist",
          Image: "$Image",
          Thumbnail: "$Thumbnail",
          User_Id: "$User_I",
          is_Publish: "$is_Publish",
          Type: "$Type",
          Create_Date: "$Create_Date",
        },
        like: { $sum: "$Like_list.State" },
      },
    },
    {
      $project: {
        _id: 0,
        Playlist_Id: "$_id.Playlist_Id",
        Playlist_Name: "$_id.Playlist_Name",
        Artist: "$_id.Artist",
        Image: "$_id.Image",
        Thumbnail: "$_id.Thumbnail",
        User_Id: "$_id.User_I",
        is_Publish: "$_id.is_Publish",
        Type: "$_id.Type",
        Create_Date: "$_id.Create_Date",
        like: 1,
      },
    },
    { $sort: { like: -1 } },
    { $limit: limit },
  ];
};

//todo done!
const SV__Search_All = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Search_Song = await Song.aggregate(SearchSong(name));
      const Search_Artist = await User.aggregate(SearchUser(name));
      const Search_Playlist = await Playlist.aggregate(SearchPlaylist(name));
      const Search_Album = await Playlist.aggregate(SearchPlaylist(name, 5, 2));

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

const SV__Search_Type = (name, type) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = [];
      console.log(name);
      switch (type) {
        case "song":
          result = await Song.aggregate(SearchSong(name, 20));
          break;
        case "playlist":
          result = await Playlist.aggregate(SearchPlaylist(name, 20));
          break;
        case "album":
          result = await Playlist.aggregate(SearchPlaylist(name, 20, 2));
          break;
        case "user":
          result = await User.aggregate(SearchUser(name, 20));
          break;
        default:
          result = [];
      }

      resolve({
        status: 200,
        message: "get all subscriptions complete!",
        data: {
          result,
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
  SV__Search_Type,
};
