const { Bill } = require("../Model/Bill");
const { Playlist } = require("../Model/Playlist");
const { Subscription } = require("../Model/Subscription");
const { Track } = require("../Model/Track");
const { User } = require("../Model/User");
const { Convert_vUpdate } = require("../Util/Convert_data");
const { Create_Id } = require("../Util/Create_Id");
const { Delete_File, Delete_Many_File } = require("../Util/Handle_File");
const { match, join, project, matchMany } = require("../Util/QueryDB");
const getValue = {
  _id: 0,
  Playlist_Id: 1,
  Playlist_Name: 1,
  Artist: 1,
  Thumbnail: 1,
  Image: 1,
  User_Id: 1,
  is_Publish: 1,
  Type: 1,
  Create_Date: 1,
  createdAt: 1,
};

const SV__Get_Playlist = (type = 1, Playlist_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (type) {
        if (Playlist_Id != null) {
          const result = await Playlist.aggregate([
            matchMany([{ Playlist_Id: Playlist_Id }, { Type: Number(type) }]),
            join("tracks", "Playlist_Id", "Playlist_Id", "PlaylistSong"),
            project(getValue, { Tracks: "$PlaylistSong.Song_Id" }),
          ]);
          return resolve({
            status: 200,
            message: "Get Playlist complete!",
            data: result[0],
          });
        }
        const getAllDefault = await Playlist.aggregate([
          match("Type", Number(type)),
          join("tracks", "Playlist_Id", "Playlist_Id", "PlaylistSong"),
          project(getValue, { Tracks: "$PlaylistSong.Song_Id" }),
        ]);

        return resolve({
          status: 200,
          message: "Get Playlist default complete!",
          data: getAllDefault,
        });
      }
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Playlist.js (SV_Get_Playlist)",
      });
      throw new Error(err);
    }
  });
};

const SV__Get_PlaylistDF = (User_Id, type = 0) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ User_Id });
      if (!checkUser) {
        return resolve({
          status: 404,
          message: "Not found user",
          error: {
            Get_Playlist: "Not found user",
          },
          data: {},
        });
      }

      const playlists = await Playlist.find({ User_Id, Type: type });
      return resolve({
        status: 200,
        message: "Get playlist successfully",
        error: {},
        data: playlists,
      });
    } catch (error) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Playlist.js (SV_Get_Playlist)",
      });
      throw new Error(error);
    }
  });
};

const SV__Get_PlaylistM = (by, type = 1) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result;
      switch (by) {
        case "user":
          result = await Playlist.aggregate([
            join("users", "User_Id", "User_Id", "User"),
            project(getValue, { is_Admin: "$User.is_Admin" }),
            {
              $unwind: "$is_Admin",
            },
            matchMany([{ is_Admin: false, Type: Number(type) }]),
          ]);
          break;

        case "admin":
          result = await Playlist.aggregate([
            join("users", "User_Id", "User_Id", "User"),
            project(getValue, { is_Admin: "$User.is_Admin" }),
            {
              $unwind: "$is_Admin",
            },
            matchMany([{ is_Admin: true, Type: Number(type) }]),
          ]);
          break;
        default:
          result = await Playlist.find();
          break;
      }
      resolve({
        status: 200,
        message: `get ${type == 1 ? "playlist" : "album"} complete!`,
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

const SV__Create_Playlist = (id, data) => {
  return new Promise(async (resolve, reject) => {
    const {
      Playlist_Name,
      Artist,
      Thumbnail,
      Image,
      is_Publish = false,
      Type = 0,
    } = data;
    try {
      const Playlist_Id = Create_Id("Playlist");
      const checkPlaylist = await Playlist.findOne({ Playlist_Id });
      if (checkPlaylist) {
        return resolve({
          status: 404,
          message: "Playlist is exist",
        });
      }

      const checkName = await Playlist.findOne({ Playlist_Name, User_Id: id });
      if (checkName) {
        return resolve({
          status: 404,
          message: "Name is using",
        });
      }

      if (Type == 2) {
        const getBill = await Bill.aggregate([
          {
            $match: {
              User_Id: id,
            },
          },
          { $sort: { Expiration_Date: -1 } },
        ]);

        var hav_sub = 1;

        if (getBill.length == 0) {
          hav_sub = 0;
        }

        if (getBill.length > 0) {
          const checkDate =
            new Date(getBill[0].Expiration_Date).toISOString() <
            new Date().toISOString(); //het hang
          if (checkDate) {
            hav_sub = 0;
          }
        }

        if (hav_sub == 0) {
          const checkAlbum = await Playlist.find({ User_Id: id, Type: 2 });
          if (checkAlbum.length >= 2) {
            return resolve({
              status: 404,
              message: "You have more than 2 albums",
              data: {},
            });
          } else {
            const result = await Playlist.create({
              Playlist_Id,
              Playlist_Name: String(Playlist_Name).toLowerCase(),
              User_Id: id,
              Artist,
              is_Publish,
              Image: Image == "null" ? "default.png" : Image,
              Thumbnail: Thumbnail == "null" ? "default.png" : Thumbnail,
              Type,
            });

            return resolve({
              status: 200,
              message: "Create album success",
              data: result,
            });
          }
        }
      }

      const result = await Playlist.create({
        Playlist_Id,
        Playlist_Name: String(Playlist_Name).toLowerCase(),
        User_Id: id,
        Artist,
        is_Publish,
        Image: Image == "null" ? "default.png" : Image,
        Thumbnail: Thumbnail == "null" ? "default.png" : Thumbnail,
        Type,
      });

      resolve({
        status: 200,
        message: "Create playlist success",
        data: result,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const SV__Update_Playlist = (Playlist_Id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Image, Thumbnail } = data;
      const Update_value = Convert_vUpdate(data, [
        "_id",
        "Playlist_Id",
        "User_Id",
        "Create_Date",
      ]);
      const find = await Playlist.findOne({ Playlist_Id });
      if (!find) {
        return resolve({ status: 404, message: "Not found Playlist with id" });
      }

      const result = await Playlist.updateOne({ Playlist_Id }, Update_value, {
        new: true,
      });
      if (!result) {
        return resolve({ status: 404, message: "Update Failed!" });
      } else {
        if (
          Image != undefined &&
          Image != find.Image &&
          Image != "null" &&
          Image != null &&
          find.Image != "default.png"
        ) {
          Delete_File("Playlist_Img", find.Image);
        }

        if (
          Thumbnail != undefined &&
          Thumbnail != find.Thumbnail &&
          Image != "null" &&
          Image != null &&
          find.Thumbnail != "default.png"
        ) {
          Delete_File("Playlist_Thumbnail", find.Thumbnail);
        }
      }
      resolve({
        status: 200,
        message: "Updated Playlist complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Playlist.js (SV_Update_Playlist)",
      });
      throw new Error(err);
    }
  });
};

const SV__Delete_Playlist = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const find = await Playlist.findOne({ Playlist_Id: id });
      if (!find) {
        return resolve({ status: 404, message: "Not found Playlist with id" });
      }
      const result = await Playlist.findOneAndDelete({
        Playlist_Id: id,
      });
      if (!result) {
        return resolve({ status: 404, message: "Not found Playlist with id" });
      }
      Delete_Many_File(
        [
          { url: "Playlist_Img", idFile: find.Image },
          { url: "Playlist_Thumbnail", idFile: find.Thumbnail },
        ],
        ["default.png"]
      );

      resolve({
        status: 200,
        message: "Delete Playlist complete!",
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Playlist.js (SV_Delete_Playlist)",
      });
      throw new Error(err);
    }
  });
};

const SV__Create_Playlist_DF = async (User_Id, User_Name) => {
  try {
    const checkLike = await Playlist.findOne({
      User_Id,
      Playlist_Name: "like",
      Type: 0,
    });

    const checkUpload = await Playlist.findOne({
      User_Id,
      Playlist_Name: "upload",
      Type: 0,
    });

    if (checkLike != null || checkUpload != null) {
      return {
        state: false,
        error: {
          PlaylistLike: checkLike
            ? "Playlist like already exists!"
            : "Not error!",
          PlaylistUpload: checkUpload
            ? "Playlist upload already exists"
            : "Not error!",
        },
        message: "Error when create!",
      };
    }

    const createLike = await Playlist.create({
      Playlist_Id: Create_Id("Playlist", "User_Name", "", "_like"),
      Playlist_Name: "like",
      Artist: User_Name,
      User_Id,
      Type: 0,
      is_Publish: false,
      User_Id,
    });

    const createUpdate = await Playlist.create({
      Playlist_Id: Create_Id("Playlist", "User_Name", "", "_upload"),
      Playlist_Name: "upload",
      Artist: User_Name,
      is_Publish: false,
      User_Id,
      Type: 0,
      User_Id,
    });

    if (!createLike || !createUpdate) {
      return {
        state: false,
        error: { Playlist: "Error when create!" },
        message: "Error when create!",
      };
    }

    return {
      state: true,
      error: {},
      message: "Create complete!",
    };
  } catch (err) {
    return false;
  }
};

const SV__Delete_Playlist_DF = async (User_Id) => {
  try {
    const find = await Playlist.find({ User_Id });
    if (!find.length) {
      return {
        state: false,
        error: {
          Playlist: "Not found playlist default for user!",
        },
        message: "Not found playlist default for user!",
      };
    }
    find.map(async (item) => {
      const valueDelete = await Playlist.findOneAndDelete({
        Playlist_Id: item.Playlist_Id,
        Type: 0,
      });
      if (!valueDelete) {
        return {
          state: false,
          error: {
            Playlist: "Not found playlist default for user!",
          },
          message: "Not found playlist default for user!",
        };
      }

      Delete_Many_File(
        [
          { url: "Playlist_Img", idFile: item.Image },
          { url: "Playlist_Thumbnail", idFile: item.Thumbnail },
        ],
        ["default.png"]
      );
      await Track.findOneAndDelete({ Playlist_Id: item.Playlist_Id });
    });

    return {
      state: false,
      error: {
        Playlist: "Not found playlist default for user!",
      },
      message: "Not found playlist default for user!",
    };
  } catch (err) {
    return false;
  }
};

module.exports = {
  SV__Get_Playlist,
  SV__Update_Playlist,
  SV__Delete_Playlist,
  SV__Create_Playlist,
  SV__Get_PlaylistDF,
  SV__Create_Playlist_DF,
  SV__Delete_Playlist_DF,
  SV__Get_PlaylistM,
};
