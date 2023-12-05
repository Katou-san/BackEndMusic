const { Playlist } = require("../Model/Playlist");
const { User } = require("../Model/User");

const CreatePlaylist = (data) => {
  return new Promise(async (resolve, reject) => {
    const { Id, Name, Avatar, IdUser, Songs } = data;
    try {
      const check = CheckPlaylist(data);
      if (check.status == "PL_F") {
        resolve({
          status: "ERR",
          message: "playlist is exist",
        });
      }
      const playlist = await Playlist.create({
        Id,
        Name,
        Avatar,
        IdUser,
        Songs,
      });
      resolve({
        status: "OK",
        message: "create playlist success",
        data: playlist,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const UpdatePlaylist = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let idPlaylist = "";
      const check = await Playlist.findOne({ Id: id });
      if (check === null) {
        resolve({
          status: "ERR",
          message: "Playlist is not exist",
        });
      }
      idPlaylist = check._id;
      const playlist = await Playlist.findOneAndUpdate(
        { _id: idPlaylist },
        data,
        {
          new: true,
        }
      );
      resolve({
        status: "OK",
        message: "Update playlist success",
        data: playlist,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const DeletePlaylist = (id, iduser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const check = await Playlist.findOne({ Id: id });
      if (check === null) {
        resolve({
          status: "ERR",
          message: "Playlist not exist",
        });
      }

      const checkUser = await User.findOne({ Id: iduser });
      if (check.Id == iduser || checkUser.isAdmin) {
        const idPlaylist = check._id;
        await Playlist.findByIdAndDelete({ _id: idPlaylist });
        resolve({
          status: "OK",
          message: "Delete playlist success",
        });
      } else {
        resolve({
          status: "ERR",
          message: "Not have permission to delete that playlist",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

const CheckPlaylist = (data) => {
  return new Promise(async (resolve, reject) => {
    const { Id } = data;
    try {
      const checkE = await User.findOne({ Id: Id });
      if (checkE == null) {
        resolve({
          status: "PL_NF",
          message: "Playlist not Exist",
        });
      } else {
        resolve({
          status: "PL_F",
          message: "Playlist Exist",
        });
      }
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  CheckPlaylist,
  CreatePlaylist,
  UpdatePlaylist,
  DeletePlaylist,
};
