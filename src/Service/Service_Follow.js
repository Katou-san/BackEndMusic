const { Follow } = require("../Model/Follow");
const { User } = require("../Model/User");
const { Create_Id } = require("../Util/Create_Id");

//todo done!
const SV__Get_Following = (User_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id) {
        const result = await Follow.find({ Follower: User_Id });
        if (!result) {
          return resolve({ status: 404, message: "Not found Follow with id" });
        }
        return resolve({
          status: 200,
          message: "Get Follow complete!",
          data: result,
        });
      }
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Follow.js (SV_Get_Follow)",
      });
      throw new Error(err);
    }
  });
};

const SV__Get_Follower = (User_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id) {
        const result = await Follow.find({ Following: User_Id });
        if (!result) {
          return resolve({ status: 404, message: "Not found Follow with id" });
        }
        return resolve({
          status: 200,
          message: "Get Follow complete!",
          data: result,
        });
      }
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Follow.js (SV_Get_Follow)",
      });
      throw new Error(err);
    }
  });
};
//! Need Check
const SV__Create_Follow = (Following, User_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const findFollowing = await User.findOne({
        User_Id: Following,
      });
      if (findFollowing) {
        return resolve({ status: 404, message: "User not is existing" });
      }

      const Check_Follow = await Follow.findOne({
        Follower: User_Id,
        Following,
      });

      if (Check_Follow) {
        return resolve({ status: 404, message: "You were followed", data: "" });
      }

      const result = await Follow.create({
        Follower: User_Id,
        Following,
      });
      resolve({
        status: 200,
        message: "Create Follow complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Follow.js (SV_Create_Follow)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Delete_Follow = (Following, User_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Check_Follow = await User.findOne({ User_Id: Following });
      if (!Check_Follow) {
        return resolve({
          status: 404,
          message: "User not existing!",
          data: {},
          error: "User not existing!",
        });
      }

      const result = await Follow.findOneAndDelete({
        Follower: User_Id,
        Following: Following,
      });
      if (!result) {
        return resolve({ status: 404, message: "Cant unfollow" });
      }
      resolve({
        status: 200,
        message: "Delete follow complete!",
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Follow.js (SV_Delete_Follow)",
      });
      throw new Error(err);
    }
  });
};

module.exports = {
  SV__Get_Follower,
  SV__Get_Following,
  SV__Delete_Follow,
  SV__Create_Follow,
};
