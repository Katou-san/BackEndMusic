const { Storage } = require("../Model/Storage");

//todo done!
const SV__Get_Storage = (User_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (User_Id) {
        const result = await Storage.findOne({ User_Id });
        if (!result) {
          return resolve({
            status: 404,
            message: "Not found storage for user",
          });
        }
        return resolve({
          status: 200,
          message: "Get storage complete!",
          data: result,
        });
      }

      const allStorage = await Storage.find();
      resolve({
        status: 200,
        message: "get all storage complete!",
        data: allStorage,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Storage.js (SV_Get_Storage)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Create_Storage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { User_Id } = data;
      const result = await Storage.create({
        User_Id,
      });
      resolve({
        status: 200,
        message: "Create storage complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Storage.js (SV_Create_Storage)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Update_Storage = (User_Id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Storage.findOneAndUpdate({ User_Id }, data, {
        new: true,
      });

      resolve({
        status: 200,
        message: "Updated Storage complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Storage.js (SV_Update_Storage)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Delete_Storage = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Storage.findOneAndDelete({ User_Id: id });
      if (!result) {
        return resolve({ status: 404, message: "Not found Storage with id" });
      }
      resolve({
        status: 200,
        message: "Delete Storage complete!",
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Storage.js (SV_Delete_Storage)",
      });
      throw new Error(err);
    }
  });
};

module.exports = {
  SV__Get_Storage,
  SV__Update_Storage,
  SV__Delete_Storage,
  SV__Create_Storage,
};
