const { Repost } = require("../Model/Repost");
const { User } = require("../Model/User");
const { Song } = require("../Model/Song");
const { Create_Id } = require("../Util/Create_Id");

//todo done!
const SV__Get_Repost = (User_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Repost.find({ User_Id });
      if (!result) {
        return resolve({ status: 404, message: "There are no reposts" });
      }
      return resolve({
        status: 200,
        message: "Get Repost complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Repost.js (SV_Get_Repost)",
      });
      throw new Error(err);
    }
  });
};

const SV__Get_Repost_Current = (User_Id, Song_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Repost.findOne({ User_Id, Song_Id });
      if (!result) {
        return resolve({ status: 404, message: "There are no reposts" });
      }
      return resolve({
        status: 200,
        message: "Get Repost complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Repost.js (SV_Get_Repost)",
      });
      throw new Error(err);
    }
  });
};

const SV__Get_Repost_Song = (Song_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Repost.find({ Song_Id });
      if (!result) {
        return resolve({ status: 404, message: "There are no reposts" });
      }
      return resolve({
        status: 200,
        message: "Get Repost complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Repost.js (SV_Get_Repost)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Create_Repost = (User_Id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Song_Id } = data;
      const checkSong = await Song.findOne({ Song_Id });
      if (!checkSong) {
        return resolve({
          status: 404,
          message: "Not found song!",
          error: {
            Repost: "Not found song!",
          },
          data: {},
        });
      }

      const findRepost = await Repost.findOne({
        Song_Id,
        User_Id,
      });
      if (findRepost) {
        return resolve({ status: 404, message: "You reposted! " });
      }
      const result = await Repost.create({
        Repost_Id: Create_Id("Repost"),
        User_Id,
        Song_Id,
      });
      resolve({
        status: 200,
        message: "Create repost complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Repost.js (SV_Create_Repost)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Update_Repost = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Repost.findOneAndUpdate({ Repost_Id: id }, data, {
        new: true,
      });
      if (!result) {
        return resolve({ status: 200, message: "Not found Repost with id" });
      }
      resolve({
        status: 200,
        message: "Updated Repost complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Repost.js (SV_Update_Repost)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Delete_Repost = (User_Id, Repost_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Repost.findOneAndDelete({ Repost_Id, User_Id });
      if (!result) {
        return resolve({ status: 404, message: "Not found repost for user" });
      }
      resolve({
        status: 200,
        message: "Delete Repost complete!",
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Repost.js (SV_Delete_Repost)",
      });
      throw new Error(err);
    }
  });
};

module.exports = {
  SV__Get_Repost,
  SV__Update_Repost,
  SV__Delete_Repost,
  SV__Create_Repost,
  SV__Get_Repost_Song,
  SV__Get_Repost_Current,
};
