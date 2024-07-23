const { Follow } = require("../Model/Follow");
const { User } = require("../Model/User");
const { Create_Id } = require("../Util/Create_Id");

//todo done!
const SV__Get_Follow = (User_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ User_Id });
      if (!checkUser) {
        return resolve({
          status: 404,
          message: "Not found user!",
          error: {
            Follow: "Not found user!",
          },
          data: {},
        });
      }

      const Following = await Follow.find({ Follower: User_Id });
      const Follower = await Follow.find({ Following: User_Id });
      return resolve({
        status: 200,
        message: "Get Follow complete!",
        data: {
          Following,
          Follower,
        },
      });
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

const SV__Get_Follow_Current = (User_Id, Following) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ User_Id });
      if (!checkUser) {
        return resolve({
          status: 404,
          message: "Not found user!",
          error: {
            Follow: "Not found user!",
          },
          data: {},
        });
      }

      const result = await Follow.findOne({ Following, Follower: User_Id });
      if (!result) {
        return resolve({
          status: 404,
          message: "Not found follow!",
          error: {
            follow: "Not found follow!",
          },
          data: {},
        });
      }

      return resolve({
        status: 200,
        message: "Get Follow complete!",
        data: result,
      });
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
      if (Following == User_Id) {
        return resolve({
          status: 404,
          message: "Cant follow you!",
          error: {
            Follow: "Cant follow you!",
          },
          data: {},
        });
      }
      const findFollowing = await User.findOne({
        User_Id: Following,
      });
      if (!findFollowing) {
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
const SV__Delete_Follow = (User_Id, Following) => {
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
        Following,
      });

      if (!result) {
        return resolve({ status: 404, message: "Cant unfollow" });
      }
      resolve({
        status: 200,
        message: "Unfollow complete!",
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
  SV__Get_Follow,
  SV__Delete_Follow,
  SV__Create_Follow,
  SV__Get_Follow_Current,
};
