const { Track } = require("../Model/Track");
const { Playlist } = require("../Model/Playlist");
const { Create_Id } = require("../Util/Create_Id");

//todo done!
const SV__Get_Track = (Playlist_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const allTracks = await Track.find({ Playlist_Id });
      resolve({
        status: 200,
        message: "get all Tracks complete!",
        data: allTracks,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Track.js (SV_Get_Track)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Create_Track = (User_Id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Playlist_Id, Song_Id } = data;
      const check_Playlist = await Playlist.findOne({ Playlist_Id, User_Id });

      if (!check_Playlist) {
        return resolve({
          status: 404,
          message: "You cant add song to playlist!",
          error: { track: "You cant add song to playlist!" },
          data: {},
        });
      }

      const findTrack = await Track.findOne({
        Playlist_Id,
        Song_Id,
      });

      if (findTrack) {
        return resolve({
          status: 404,
          message: "You added!",
          error: { track: "You added!" },
          data: {},
        });
      }
      const result = await Track.create({
        Playlist_Id,
        Song_Id,
      });
      resolve({
        status: 200,
        message: "Add song to playlist complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Track.js (SV_Create_Track)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Delete_Track = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Playlist_Id, Song_Id } = data;
      const Check_Track = await Playlist.findOne({ Playlist_Id });
      if (Check_Track) {
        return resolve({
          status: 404,
          message: "Track is using!",
          error: "Track is using",
        });
      }

      const result = await Track.findOneAndDelete({ Track_Id: id });
      if (!result) {
        return resolve({ status: 404, message: "Not found Track with id" });
      }
      resolve({
        status: 200,
        message: "Delete Track complete!",
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Track.js (SV_Delete_Track)",
      });
      throw new Error(err);
    }
  });
};

module.exports = {
  SV__Get_Track,
  SV__Delete_Track,
  SV__Create_Track,
};
