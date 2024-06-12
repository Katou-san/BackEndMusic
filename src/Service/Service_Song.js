const { Song } = require("../Model/Song");
const { Convert_vUpdate } = require("../Util/Convert_data");
const { Create_Id } = require("../Util/Create_Id");
const { Delete_File, Delete_Many_File } = require("../Util/Handle_File");
const SV__Get_Song = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id) {
        const result = await Song.findOne({ Song_Id: id });
        if (!result) {
          return resolve({ status: 200, message: "Not found Song with id" });
        }
        return resolve({
          status: 200,
          message: "Get song complete!",
          data: result,
        });
      }

      const allSongs = await Song.find();
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

const SV__Create_Song = (data, User_Id) => {
  return new Promise(async (resolve, reject) => {
    const {
      Song_Name,
      Post_Time,
      Category_Id,
      Song_Src,
      Song_Image = "default.png",
      Lyrics,
      Tag,
      Color,
      Is_Publish = true,
    } = data;

    const IdSong = Create_Id("Song", Song_Name);
    try {
      const check = await Song.findOne({ Song_Id: IdSong });
      if (check) {
        resolve({
          status: "404",
          message: "Song already have!",
        });
      }

      const song = await Song.create({
        Song_Id: IdSong,
        Song_Name: String(Song_Name).toLowerCase(),
        Song_Src: Song_Src,
        Song_Image: Song_Image != "null" ? Song_Image : "default.png",
        User_Id,
        Category_Id,
        Lyrics,
        Tag,
        Color,
        Is_Publish: Is_Publish,
      });

      resolve({
        status: "200",
        message: "Song created!",
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
      const Update_V = Convert_vUpdate(data, ["User_Id", "_id", "Song_Id"]);
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

const SV__Delete_Song = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const find = await Song.findOne({ Song_Id: id });
      if (!find) {
        return resolve({ status: 404, message: "Not found song with id" });
      }

      Delete_Many_File(
        [
          { url: "Song_Image", idFile: find.Song_Image },
          { url: "Song_Audio", idFile: find.Song_Src },
        ],
        ["default.png"]
      );

      const result = await Song.deleteOne({ Song_Id: id });
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

module.exports = {
  SV__Get_Song,
  SV__Update_Song,
  SV__Delete_Song,
  SV__Create_Song,
};
