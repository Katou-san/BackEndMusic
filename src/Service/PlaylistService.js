const { Playlist } = require("../Model/Playlist");
const { User } = require("../Model/User");

const CreatePlaylist = (data) => {
  return new Promise(async (resolve, reject) => {
    const { Post_Time, Playlist_Name, Image, Thumbnail, User_Id, List_Song } =
      data;
    try {
      const FileName = User_Id + "_" + Song_Name + "_" + Post_Time;
      const check = await Playlist.findOne({ Playlist_Id: Playlist_Id });
      if (check != null) {
        resolve({
          status: "404",
          message: "Playlist is exist",
        });
      }
      const playlist = await Playlist.create({
        Playlist_Id: Post_Time,
        Playlist_Name: Playlist_Name,
        Image: FileName + path.extname(file[0].originalname),
        Thumbnail: FileName + path.extname(file[1].originalname),
        User_Id: User_Id,
        List_Song: List_Song,
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
