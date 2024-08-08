const { Song } = require("../Model/Song");
const { Playlist } = require("../Model/Playlist");
const { join, match } = require("../Util/QueryDB");
const { User } = require("../Model/User");
const { Role } = require("../Model/Role");
const getValueSong = {
  _id: 0,
  Song_Id: 1,
  Song_Name: 1,
  Song_Image: 1,
  Song_Audio: 1,
  Artist: 1,
  User_Id: 1,
  Category_Id: 1,
  Lyrics: 1,
  Tag: 1,
  Color: 1,
  is_Publish: 1,
  Create_Date: 1,
};

const getValuePlaylist = {
  _id: 0,
  Artist: 1,
  User_Id: 1,
  is_Publish: 1,
  Create_Date: 1,
  Playlist_Id: 1,
  Playlist_Name: 1,
  Image: 1,
  Thumbnail: 1,
  Type: 1,
};

const getValueUser = {
  _id: 0,
  User_Id: 1,
  User_Name: 1,
  Avatar: 1,
  Phone: 1,
  is_Premium: 1,
  Status: 1,
  Role_Id: 1,
  createdAt: 1,
  Create_date: 1,
};
const SV__Get_Slider = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const getSong = await Song.aggregate([
        match("is_Publish", true),
        join("likes", "Song_Id", "Topic_Id", "like"),
        join("artists", "Artist", "Artist_Id", "artist_t"),
        {
          $project: {
            ...getValueSong,
            is_Admin: "$User.is_Admin",
            Artist_Name: {
              $ifNull: [{ $first: "$artist_t.Artist_Name" }, "unknown"],
            },
            likes: "$like.State",
          },
        },
      ]).limit(5);

      resolve({
        status: 200,
        data: getSong,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Service_Trending.js (SV__Get_Trending_Slider)",
      });
      throw new Error(err);
    }
  });
};

const SV__Get_Trending_Song = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const getSong = await Song.aggregate([
        match("is_Publish", true),
        join("likes", "Song_Id", "Topic_Id", "like"),
        join("artists", "Artist", "Artist_Id", "artist_t"),
        {
          $project: {
            ...getValueSong,
            is_Admin: "$User.is_Admin",
            Artist_Name: {
              $ifNull: [{ $first: "$artist_t.Artist_Name" }, "unknown"],
            },
            likes: "$like.State",
          },
        },
      ]).limit(10);

      resolve({
        status: 200,
        data: getSong,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Service_Trending.js (SV__Get_Trending_Slider)",
      });
      throw new Error(err);
    }
  });
};

const SV__Get_Trending_Playlist = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const getPlaylist = await Playlist.aggregate([
        { $match: { is_Publish: true, Type: 1 } },
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
        { $limit: 10 },
      ]);
      resolve({
        status: 200,
        data: getPlaylist,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Service_Trending.js (SV__Get_Trending_Slider)",
      });
      throw new Error(err);
    }
  });
};

const SV__Get_Trending_Artist = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const getRole = await Role.findOne({ Role_Name: "creator" });

      const result = await User.aggregate(
        [
          { $match: { is_Admin: false, Status: 1, Role_Id: getRole.Role_Id } },
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
          { $limit: 10 },
        ],
        { maxTimeMS: 60000, allowDiskUse: true }
      );

      resolve({
        status: 200,
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Service_Trending.js (SV__Get_Trending_Slider)",
      });
      throw new Error(err);
    }
  });
};

const SV__Get_Trending_Season = () => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve({});
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Service_Trending.js (SV__Get_Trending_Slider)",
      });
      throw new Error(err);
    }
  });
};
const SV__Get_Trending_Album = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const getPlaylist = await Playlist.aggregate([
        { $match: { is_Publish: true, Type: 2 } },
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
        { $limit: 10 },
      ]);
      resolve({
        status: 200,
        data: getPlaylist,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Service_Trending.js (SV__Get_Trending_Slider)",
      });
      throw new Error(err);
    }
  });
};

module.exports = {
  SV__Get_Slider,
  SV__Get_Trending_Album,
  SV__Get_Trending_Artist,
  SV__Get_Trending_Playlist,
  SV__Get_Trending_Season,
  SV__Get_Trending_Song,
};
