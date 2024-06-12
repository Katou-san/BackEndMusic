const { Like } = require("../Model/Like");
const { Convert_vUpdate } = require("../Util/Convert_data");
const { Create_Id } = require("../Util/Create_Id");

//todo done!
const SV__Get_Like = (Topic_Id, Type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Like.find({ Topic_Id, Type });
      return resolve({
        status: 200,
        message: "Get Like complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message: "something went wrong in Admin_Service_Like.js (SV_Get_Like)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Create_Like = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Topic_Id, User_Id, Type, State } = data;
      const result = await Like.create({
        Topic_Id,
        User_Id,
        Type,
        State,
      });
      resolve({
        status: 200,
        message: "Create Like complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Like.js (SV_Create_Like)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Update_Like = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const UpdateData = Convert_vUpdate(data, [
        "_id",
        "Topic_Id",
        "Type",
        "User_Id",
      ]);
      const result = await Like.findOneAndUpdate({ Like_Id: id }, UpdateData, {
        new: true,
      });
      if (!result) {
        return resolve({ status: 200, message: "Not found Like with id" });
      }
      resolve({
        status: 200,
        message: "Updated Like complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Like.js (SV_Update_Like)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Delete_Like = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Topic_Id, User_Id, Type } = data;
      const result = await Like.findOneAndDelete({ Topic_Id, User_Id, Type });
      if (!result) {
        return resolve({ status: 404, message: "Not found Like with id" });
      }
      resolve({
        status: 200,
        message: "Delete Like complete!",
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Like.js (SV_Delete_Like)",
      });
      throw new Error(err);
    }
  });
};

module.exports = {
  SV__Get_Like,
  SV__Update_Like,
  SV__Delete_Like,
  SV__Create_Like,
};
