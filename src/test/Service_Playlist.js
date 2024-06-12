const { Playlist } = require("../Model/Playlist");
const { User } = require("../Model/User");
const path = require("path");
var fs = require("fs");
const Create_Playlist_Service = (data) => {
  return new Promise(async (resolve, reject) => {
    const { Post_Time, Playlist_Name, Playlist_Is_Publish, User_Id } = data;
    try {
      const New_PlayList_Name = Playlist_Name.toLowerCase();
      const Playlist_Id =
        User_Id + "_" + New_PlayList_Name.replaceAll(" ", "") + "_" + Post_Time;

      const check = await Playlist.findOne({ Playlist_Id: Playlist_Id });
      if (check != null) {
        resolve({
          status: "404",
          message: "Playlist is exist",
        });
      }

      const playlist = await Playlist.create({
        Playlist_Id: Playlist_Id,
        Playlist_Name: New_PlayList_Name,
        User_Id,
        Playlist_Is_Publish,
      });

      resolve({
        status: "OK",
        message: "create playlist success",
        Playlist: {
          Playlist_Id: playlist.Playlist_Id,
        },
      });
    } catch (err) {
      reject(err);
    }
  });
};

const Update_Playlist_Service = (User_Id, Playlist_Id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Find_Playlist = await Playlist.findOne({ Playlist_Id, User_Id });
      if (Find_Playlist === null) {
        resolve({
          status: 404,
          message: "Playlist is not exist",
        });
      }
      await Playlist.findOneAndUpdate({ Playlist_Id, User_Id }, data, {
        new: true,
      });

      resolve({
        status: 200,
        message: "Update playlist success",
      });
    } catch (err) {
      reject(err);
    }
  });
};

const Delete_Playlist_Service = (User_Id, Playlist_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Find_Playlist = await Playlist.findOne({ User_Id, Playlist_Id });
      if (Find_Playlist === null) {
        resolve({
          status: 200,
          message: "Playlist not exist",
        });
      }

      if (Find_Playlist) {
        await User.updateMany({}, { $pull: { Playlist: Playlist_Id } });
        if (Find_Playlist.Image !== "Img_Default_Playlist.png") {
          fs.unlinkSync("./src/Assets/Playlist_Img/" + Find_Playlist.Image);
        }

        await Playlist.deleteOne({
          Playlist_Id: Playlist_Id,
          User_Id: User_Id,
        });

        resolve({
          status: 200,
          message: "Playlist not exist",
        });
      }
    } catch (err) {
      reject({ status: 404, message: "Cant delete playlist" });
    }
  });
};

const Get_Playlist_Service = (Playlist_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Find_Playlist = await Playlist.findOne({
        Playlist_Id,
        Playlist_Is_Publish: true,
      });
      if (Find_Playlist == null) {
        resolve({
          status: 404,
          message: "Not Found Play List",
        });
      }

      resolve({
        status: 200,
        message: "Get Playlist Complete",
        data: Find_Playlist,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const Update_Playlist_Info_Service = (User_Id, Playlist_Id, data, file) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Playlist_Name, Post_Time, Playlist_Is_Publish } = data;
      const Set_Name =
        User_Id +
        "_" +
        Playlist_Name.replaceAll(" ", "の20の") +
        "_" +
        Post_Time;

      const Find_Playlist = await Playlist.findOne({ Playlist_Id, User_Id });
      if (Find_Playlist === null) {
        resolve({
          status: 404,
          message: "Playlist is not exist",
        });
      }
      if (file[0] && Find_Playlist.Image !== "Img_Default_Playlist.png") {
        fs.unlinkSync("./src/Assets/Playlist_Img/" + Find_Playlist.Image);
      }

      await Playlist.findOneAndUpdate(
        { Playlist_Id, User_Id },
        {
          Playlist_Name,
          Image: file[0]
            ? Set_Name + path.extname(file[0].originalname)
            : Find_Playlist.Image,
          Playlist_Is_Publish,
        },
        {
          new: true,
        }
      );
      resolve({
        status: 200,
        message: "Update playlist success",
      });
    } catch (err) {
      reject(err);
    }
  });
};

const Manage_Get_Playlist_Service = (Playlist_Id, User_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Find_Playlist = await Playlist.findOne({ Playlist_Id, User_Id });
      if (Find_Playlist == null) {
        resolve({
          status: 404,
          message: "Not Found Playlist",
        });
      }

      resolve({
        status: 200,
        message: "Get Playlist Complete",
        data: Find_Playlist,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const Create_default_playlist = async (User_Id) => {
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
  Get_Playlist_Service,
  Create_Playlist_Service,
  Update_Playlist_Service,
  Delete_Playlist_Service,
  Update_Playlist_Info_Service,
  Manage_Get_Playlist_Service,
  Create_default_playlist,
};
