const { Playlist } = require("../Model/Playlist");
const { Convert_vUpdate } = require("../Util/Convert_data");
const { Create_Id } = require("../Util/Create_Id");
const { Delete_File, Delete_Many_File } = require("../Util/Handle_File");
const { match, join, project } = require("../Util/QueryDB");

const getValue = {
  _id: 0,
  Playlist_Id: 1,
  Playlist_Name: 1,
  Artist: 1,
  Image: 1,
  User_Id: 1,
  is_Publish: 1,
};

const SV__Get_Playlist = (Playlist_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (Playlist_Id != null) {
        const result = await Playlist.aggregate([
          match("Playlist_Id", Playlist_Id),
          join("tracks", "Playlist_Id", "Playlist_Id", "PlaylistSong"),
          project(getValue, { Tracks: "$PlaylistSong.Song_Id" }),
        ]);

        if (!result) {
          return resolve({
            status: 200,
            message: "Not found Playlist with id",
          });
        }
        return resolve({
          status: 200,
          message: "Get Playlist complete!",
          data: result,
        });
      }

      const allPlaylists = await Playlist.aggregate([
        join("tracks", "Playlist_Id", "Playlist_Id", "PlaylistSong"),
        project(getValue, { Tracks: "$PlaylistSong.Song_Id" }),
      ]);
      resolve({
        status: 200,
        message: "get all Playlist complete!",
        data: allPlaylists,
      });
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

const SV__Create_Playlist = (id, data) => {
  return new Promise(async (resolve, reject) => {
    const {
      Playlist_Name,
      Artist,
      Thumbnail,
      Image,
      is_Publish = true,
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

      Delete_Many_File(
        [
          { url: "Playlist_Img", idFile: find.Image },
          { url: "Playlist_Thumbnail", idFile: find.Thumbnail },
        ],
        ["default.png"]
      );

      const result = await Playlist.deleteOne({
        Playlist_Id: id,
      });
      if (!result) {
        return resolve({ status: 404, message: "Not found Playlist with id" });
      }

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

const SV__Create_Playlist_DF = async (User_Id) => {
  try {
    await Playlist.create({
      Playlist_Id: User_Id + "_Like",
      Playlist_Name: "Like",
      User_Id: User_Id,
    });
    await Playlist.create({
      Playlist_Id: User_Id + "_Upload",
      Playlist_Name: "Upload",
      User_Id: User_Id,
    });

    return true;
  } catch (err) {
    return false;
  }
};

module.exports = {
  SV__Get_Playlist,
  SV__Update_Playlist,
  SV__Delete_Playlist,
  SV__Create_Playlist,
  SV__Create_Playlist_DF,
};
