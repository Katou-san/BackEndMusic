const { Playlist } = require("../Model/Playlist");
const { Convert_vUpdate } = require("../Util/Convert_data");
const { Create_Id } = require("../Util/Create_Id");
const SV__Get_Playlist = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id != null) {
        const result = await Playlist.findOne({ Playlist_Id: id });
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

      const allPlaylists = await Playlist.find();
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
    const { Post_Time, Playlist_Name, Playlist_Is_Publish = true } = data;
    try {
      const Playlist_Id = Create_Id("Playlist", Playlist_Name, Post_Time);
      const find = await Playlist.findOne({ Playlist_Id });
      if (find) {
        resolve({
          status: "404",
          message: "Playlist is exist",
        });
      }

      const result = await Playlist.create({
        Playlist_Id,
        Playlist_Name: String(Playlist_Name).toLowerCase(),
        User_Id: id,
        Playlist_Is_Publish,
      });

      resolve({
        status: "OK",
        message: "create playlist success",
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
      const Update_value = Convert_vUpdate(data, [
        "_id",
        "Playlist_Id",
        "User_Id",
      ]);
      const result = await Playlist.findOneAndUpdate(
        { Playlist_Id },
        Update_value,
        { new: true }
      );
      if (!result) {
        resolve({ status: 200, message: "Not found Playlist with id" });
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
      const result = await Playlist.findOneAndDelete({
        Playlist_Id: id,
      });
      if (!result) {
        resolve({ status: 200, message: "Not found Playlist with id" });
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

module.exports = {
  SV__Get_Playlist,
  SV__Update_Playlist,
  SV__Delete_Playlist,
  SV__Create_Playlist,
};
