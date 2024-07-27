const { Song } = require("../Model/Song");
const { Playlist } = require("../Model/Playlist");
const { join, match, project, matchMany } = require("../Util/QueryDB");
const { Get_Max_Array } = require("../Util/Convert_data");
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
        project(getValueSong, { likes: "$like.State" }),
      ]);

      const result = Get_Max_Array(getSong, "likes", "Song_Id", 5);
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

const SV__Get_Trending_Song = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const getSong = await Song.aggregate([
        match("is_Publish", true),
        join("likes", "Song_Id", "Topic_Id", "like"),
        project(getValueSong, { likes: "$like.State" }),
      ]);

      const result = Get_Max_Array(getSong, "likes", "Song_Id", 20);

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

const SV__Get_Trending_Playlist = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const getPlaylist = await Playlist.aggregate([
        matchMany([{ is_Publish: true }, { Type: 1 }]),
        join("likes", "Playlist_Id", "Topic_Id", "like"),
        project(getValuePlaylist, { likes: "$like.State" }),
      ]);

      const result = Get_Max_Array(getPlaylist, "likes", "Playlist_Id", 20);
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

const SV__Get_Trending_Artist = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const getRole = await Role.findOne({ Role_Name: "creator" });

      const result = await User.find({
        Status: 1,
        Role_Id: getRole.Role_Id,
      }).select(getValueUser);

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
        matchMany([{ is_Publish: true }, { Type: 2 }]),
        join("likes", "Playlist_Id", "Topic_Id", "like"),
        project(getValuePlaylist, { likes: "$like.State" }),
      ]);

      const result = Get_Max_Array(getPlaylist, "likes", "Playlist_Id", 20);
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

module.exports = {
  SV__Get_Slider,
  SV__Get_Trending_Album,
  SV__Get_Trending_Artist,
  SV__Get_Trending_Playlist,
  SV__Get_Trending_Season,
  SV__Get_Trending_Song,
};
