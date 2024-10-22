const { Playlist } = require("../Model/Playlist");
const { Song } = require("../Model/Song");
const { Track } = require("../Model/Track");
const { Storage } = require("../Model/Storage");
const { Artist: ArtistModel } = require("../Model/Artist");
const {
  Convert_vUpdate,
  removeVietnameseTones,
} = require("../Util/Convert_data");
const { Create_Id } = require("../Util/Create_Id");
const { Delete_Many_File, getFileSize } = require("../Util/Handle_File");
const { match, join, project } = require("../Util/QueryDB");
const { Repost } = require("../Model/Repost");
const { SV__Create_Artist_Song } = require("./Service_Artist");
const { Fingerprints } = require("../Model/Audio_FP");

const getValue = {
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
  Artist_Name: 1,
};

const SV__Get_Song = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id) {
        const result = await Song.aggregate([
          join("artists", "Artist", "Artist_Id", "artist_t"),
          {
            $project: {
              ...getValue,
              is_Admin: "$User.is_Admin",
              Artist_Name: {
                $ifNull: [{ $first: "$artist_t.Artist_Name" }, "unknown"],
              },
            },
          },
          match("Song_Id", id),
        ]);
        if (result.length == 0) {
          return resolve({ status: 200, message: "Not found Song with id" });
        }
        return resolve({
          status: 200,
          message: "Get song complete!",
          data: result[0],
        });
      }

      const allSongs = await Song.aggregate([
        join("artists", "Artist", "Artist_Id", "artist_t"),
        {
          $project: {
            ...getValue,
            Artist_Name: {
              $ifNull: [{ $first: "$artist_t.Artist_Name" }, "unknown"],
            },
          },
        },
      ]);

      resolve({
        status: 200,
        message: "get all Songs complete!",
        data: allSongs,
      });
    } catch (err) {
      reject({
        status: 404,
        message: "something went wrong in Admin_Service_Song.js (SV_Get_Song)",
      });
      throw new Error(err);
    }
  });
};

const SV__Get_SongM = (type) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result;
      switch (type) {
        case "user":
          result = await Song.aggregate([
            join("users", "User_Id", "User_Id", "User"),
            join("artists", "Artist", "Artist_Id", "artist_t"),
            {
              $project: {
                ...getValue,
                is_Admin: "$User.is_Admin",
                Artist_Name: {
                  $ifNull: [{ $first: "$artist_t.Artist_Name" }, "unknown"],
                },
              },
            },
            {
              $unwind: "$is_Admin",
            },
            match("is_Admin", false),
          ]);
          break;

        case "admin":
          result = await Song.aggregate([
            join("users", "User_Id", "User_Id", "User"),
            join("artists", "Artist", "Artist_Id", "artist_t"),
            {
              $project: {
                ...getValue,
                is_Admin: "$User.is_Admin",
                Artist_Name: {
                  $ifNull: [{ $first: "$artist_t.Artist_Name" }, "unknown"],
                },
              },
            },
            {
              $unwind: "$is_Admin",
            },
            match("is_Admin", true),
          ]);
          break;
        default:
          result = await Song.find();
          break;
      }
      resolve({
        status: 200,
        message: "get all Songs complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message: "something went wrong in Admin_Service_Song.js (SV_Get_Song)",
      });
      throw new Error(err);
    }
  });
};

const SV__Create_Song = (data, User_Id) => {
  return new Promise(async (resolve, reject) => {
    const {
      Song_Name,
      Artist,
      Category_Id,
      Song_Audio,
      Song_Image = "default.png",
      Lyrics,
      Tag,
      Color,
      is_Publish = true,
    } = data;

    const IdSong = Create_Id("Song");
    try {
      const check = await Song.findOne({ Song_Id: IdSong });
      if (check) {
        resolve({
          status: "404",
          message: "Song already have!",
        });
      }

      const checkSongName = await Song.findOne({
        Song_Name: String(Song_Name).toLowerCase(),
      });
      if (checkSongName) {
        resolve({
          status: "404",
          message: "Name is using!",
        });
      }

      const checkUpload = await Playlist.findOne({
        User_Id,
        Type: 0,
        Playlist_Name: "upload",
      });

      if (!checkUpload) {
        return resolve({
          status: 404,
          message: "Cant upload when not found playlist default",
          error: { song: "Cant upload when not found playlist default" },
          data: {},
        });
      }

      const fileSize = getFileSize(Song_Audio);
      const getStorage = await Storage.findOne({ User_Id });
      if (getStorage.Used + fileSize <= getStorage.Limit) {
        await Storage.findOneAndUpdate(
          { User_Id },
          { Used: getStorage.Used + fileSize },
          { new: true }
        );
      } else {
        return resolve({
          status: 400,
          message: "Memory capacity is not enough",
          error: { song: "Create song failed" },
          data: {},
        });
      }

      let tempArtist = false;
      let Arist_Id = "";
      if (!tempArtist) {
        const checkArist = await ArtistModel.findOne({
          Artist_Id: Artist,
        });
        if (checkArist) {
          tempArtist = true;
          Arist_Id = checkArist.Artist_Id;
        }
      }

      if (!tempArtist) {
        const checkAristKey = await ArtistModel.findOne({
          Artist_Key: removeVietnameseTones(
            String(Artist).toLowerCase().trim()
          ),
        });
        if (checkAristKey) {
          tempArtist = true;
          Arist_Id = checkAristKey.Artist_Id;
        }
      }

      if (!tempArtist) {
        Arist_Id = await SV__Create_Artist_Song(Artist);
      }

      const song = await Song.create({
        Song_Id: IdSong,
        Song_Name: String(Song_Name).trim(),
        Song_Audio,
        Song_Image: Song_Image != "null" ? Song_Image : "default.png",
        Artist: Arist_Id,
        User_Id,
        Category_Id,
        Lyrics,
        Tag,
        Color,
        is_Publish,
      });

      if (!song) {
        await Storage.findOneAndUpdate(
          { User_Id },
          { Used: getStorage.Used - fileSize },
          { new: true }
        );

        return resolve({
          status: 404,
          message: "Create song failed!",
          error: { song: "Create song failed!" },
          data: {},
        });
      }

      await Track.create({
        Song_Id: song.Song_Id,
        Playlist_Id: checkUpload.Playlist_Id,
      });

      resolve({
        status: 200,
        message: "Song created!",
        error: {},
        data: song,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const SV__Update_Song = (id, data, User_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Song_Image, Artist } = data;

      let tempArtist = false;
      let Arist_Id = "";

      let Update_V = Convert_vUpdate(data, ["User_Id", "_id", "Song_Id"]);
      if (Artist != undefined && Artist != "unknown") {
        if (!tempArtist) {
          const checkArist = await ArtistModel.findOne({
            Artist_Id: Artist,
          });
          if (checkArist) {
            tempArtist = true;
            Update_V = Convert_vUpdate(
              { ...data, Artist: checkArist.Artist_Id },
              ["User_Id", "_id", "Song_Id"]
            );
          }
        }
        if (!tempArtist) {
          const checkAristKey = await ArtistModel.findOne({
            Artist_Key: removeVietnameseTones(
              String(Artist).toLowerCase().trim()
            ),
          });
          if (checkAristKey) {
            tempArtist = true;
            Update_V = Convert_vUpdate(
              { ...data, Artist: checkAristKey.Artist_Id },
              ["User_Id", "_id", "Song_Id"]
            );
          }
        }
        if (!tempArtist) {
          Arist_Id = await SV__Create_Artist_Song(Artist);
          Update_V = Convert_vUpdate({ ...data, Artist: Arist_Id }, [
            "User_Id",
            "_id",
            "Song_Id",
          ]);
        }
      }

      const state_Song = await Song.findOne({ Song_Id: id });
      const result = await Song.findOneAndUpdate(
        { Song_Id: id, User_Id },
        Update_V,
        {
          new: true,
        }
      );
      if (!result) {
        return resolve({
          status: 200,
          message: "Not found song with id for you",
        });
      }
      if (
        Song_Image != undefined &&
        Song_Image != null &&
        !Song_Image != "null"
      ) {
        Delete_Many_File(
          [{ url: "Song_Image", idFile: state_Song.Song_Image }],
          ["default.png"]
        );
      }

      resolve({
        status: 200,
        message: "Updated Song complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Song.js (SV_Update_Song)",
      });
      throw new Error(err);
    }
  });
};

const SV__Delete_Song = (id, User_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const find = await Song.findOne({ Song_Id: id, User_Id });
      if (!find) {
        return resolve({ status: 404, message: "Not found song with id" });
      }

      const fileSize = getFileSize(find.Song_Audio);
      const getStorage = await Storage.findOne({ User_Id });
      await Storage.findOneAndUpdate(
        { User_Id },
        {
          Used: getStorage.Used - fileSize < 0 ? 0 : getStorage.Used - fileSize,
        }
      );

      const result = await Song.deleteOne({ Song_Id: id });

      Delete_Many_File(
        [
          { url: "Song_Image", idFile: find.Song_Image },
          { url: "Song_Audio", idFile: find.Song_Src },
        ],
        ["default.png"]
      );

      await Track.deleteMany({ Song_Id: find.Song_Id });
      await Fingerprints.deleteOne({ Song_Id: id });
      resolve({
        status: 200,
        message: result ? "Delete song complete!" : "Delete song failed",
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Song.js (SV_Delete_Song)",
      });
    }
  });
};

const SV__Check_Delete_Song = (id, User_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const find = await Song.findOne({ Song_Id: id, User_Id });
      if (!find) {
        return resolve({ status: 404, message: "Not found song with id" });
      }
      const checkTrack = await Track.findOne({ Song_Id: id });
      const checkPlaylist = await Playlist.findOne({
        Playlist_Id: checkTrack.Playlist_Id,
        Type: 1,
      });

      if (checkPlaylist) {
        return resolve({
          status: 404,
          data: {
            Noitification: true,
          },
        });
      }

      const checkRepost = await Repost.findOne({ Song_Id: id });
      if (checkRepost) {
        return resolve({
          status: 404,
          data: {
            Noitification: true,
          },
        });
      }

      resolve({
        status: 200,
        data: {
          Noitification: false,
        },
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Song.js (SV_Delete_Song)",
      });
    }
  });
};

const SV__Delete_Song_Admin = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const find = await Song.findOne({ Song_Id: id });
      if (!find) {
        return resolve({ status: 404, message: "Not found song with id" });
      }

      const fileSize = getFileSize(find.Song_Audio);
      const getStorage = await Storage.findOne({ User_Id: find.User_Id });
      await Storage.findOneAndUpdate(
        { User_Id: find.Song_Id },
        {
          Used: getStorage.Used - fileSize < 0 ? 0 : getStorage.Used - fileSize,
        }
      );

      const result = await Song.findOneAndDelete({ Song_Id: id });
      if (!result) {
        return resolve({ status: 404, message: "Not found song with id" });
      }
      Delete_Many_File(
        [
          { url: "Song_Image", idFile: find.Song_Image },
          { url: "Song_Audio", idFile: find.Song_Audio },
        ],
        ["default.png"]
      );

      await Track.deleteMany({ Song_Id: find.Song_Id });
      await Fingerprints.deleteOne({ Song_Id: find.Song_Id });
      resolve({
        status: 200,
        message: result ? "Delete song complete!" : "Delete song failed",
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Song.js (SV_Delete_Song)",
      });
    }
  });
};

const SV__Update_Song_Admin = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Song_Image, Artist } = data;

      let tempArtist = false;
      let Arist_Id = "";

      let Update_V = Convert_vUpdate(data, ["User_Id", "_id", "Song_Id"]);
      if (Artist != undefined && Artist != "unknown") {
        if (!tempArtist) {
          const checkArist = await ArtistModel.findOne({
            Artist_Id: Artist,
          });
          if (checkArist) {
            tempArtist = true;
            Update_V = Convert_vUpdate(
              { ...data, Artist: checkArist.Artist_Id },
              ["User_Id", "_id", "Song_Id"]
            );
          }
        }
        if (!tempArtist) {
          const checkAristKey = await ArtistModel.findOne({
            Artist_Key: removeVietnameseTones(
              String(Artist).toLowerCase().trim()
            ),
          });
          if (checkAristKey) {
            tempArtist = true;
            Update_V = Convert_vUpdate(
              { ...data, Artist: checkAristKey.Artist_Id },
              ["User_Id", "_id", "Song_Id"]
            );
          }
        }
        if (!tempArtist) {
          Arist_Id = await SV__Create_Artist_Song(Artist);
          Update_V = Convert_vUpdate({ ...data, Artist: Arist_Id }, [
            "User_Id",
            "_id",
            "Song_Id",
          ]);
        }
      }

      const state_Song = await Song.findOne({ Song_Id: id });
      const result = await Song.findOneAndUpdate(
        { Song_Id: id, User_Id: state_Song.User_Id },
        Update_V,
        {
          new: true,
        }
      );
      if (!result) {
        return resolve({
          status: 200,
          message: "Not found song with id for you",
        });
      }
      if (
        Song_Image != undefined &&
        Song_Image != null &&
        Song_Image != "null"
      ) {
        Delete_Many_File(
          [{ url: "Song_Image", idFile: state_Song.Song_Image }],
          ["default.png"]
        );
      }

      resolve({
        status: 200,
        message: "Updated Song complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Song.js (SV_Update_Song)",
      });
      throw new Error(err);
    }
  });
};

const SV__Check_Delete_Song_Admin = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const find = await Song.findOne({ Song_Id: id });
      if (!find) {
        return resolve({ status: 404, message: "Not found song with id" });
      }
      const checkTrack = await Track.find({ Song_Id: id });

      checkTrack.map(async (track) => {
        const checkPlaylist = await Playlist.findOne({
          Playlist_Id: track.Playlist_Id,
          Type: 1,
        });
        if (checkPlaylist) {
          return resolve({
            status: 404,
            data: {
              Noitification: true,
            },
          });
        }
      });

      const checkRepost = await Repost.findOne({ Song_Id: id });
      if (checkRepost) {
        return resolve({
          status: 404,
          data: {
            Noitification: true,
          },
        });
      }

      resolve({
        status: 200,
        data: {
          Noitification: false,
        },
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Song.js (SV_Delete_Song)",
      });
    }
  });
};

module.exports = {
  SV__Get_Song,
  SV__Update_Song,
  SV__Delete_Song,
  SV__Create_Song,
  SV__Get_SongM,
  SV__Delete_Song_Admin,
  SV__Update_Song_Admin,
  SV__Check_Delete_Song,
  SV__Check_Delete_Song_Admin,
};
