const { Track } = require("../Model/Track");
const { Song } = require("../Model/Song");
const { Playlist } = require("../Model/Playlist");

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

      const checkSong = await Song.findOne({ Song_Id });
      if (!checkSong) {
        return resolve({
          status: 404,
          message: "Not found this song!",
          error: { track: "Not found this song!" },
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
const SV__Delete_Track = (User_Id, Playlist_Id, Song_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkPlaylist = await Playlist.findOne({ Playlist_Id, User_Id });
      if (!checkPlaylist) {
        return resolve({
          status: 404,
          message: "Playlist isn't your!",
          error: {
            Track: "Playlist isn't your!",
          },
          data: {},
        });
      }

      const result = await Track.findOneAndDelete({ Playlist_Id, Song_Id });
      if (!result) {
        return resolve({
          status: 404,
          message: "Track not exsit!",
          error: { Track: "Track not exsit!" },
          data: {},
        });
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
