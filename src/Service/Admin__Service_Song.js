const { Song } = require("../Model/Song");
const SV__Get_Song = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id != null) {
        const result = await Song.find({ Song_Id: id });
        if (!result) {
          resolve({ status: 200, message: "Not found Song with id" });
        }
        resolve({ status: 200, message: "Get song complete!", data: result });
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

const SV__Update_Song = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const findSong = await Song.find({ Song_Id: id });
      if (!findSong) {
        resolve({ status: 200, message: "Not found song with id" });
      }

      const result = await Song.updateOne(data);
      resolve({
        status: 200,
        message: result ? "Updated Song complete!" : "Updated Song failed",
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
      const findSong = await Song.find({ Song_Id: id });
      if (!findSong) {
        resolve({ status: 200, message: "Not found song with id" });
      }

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
      throw new Error(err);
    }
  });
};

module.exports = { SV__Get_Song, SV__Update_Song, SV__Delete_Song };
