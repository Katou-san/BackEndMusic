const { Premium } = require("../Model/Premium");
const { Storage } = require("../Model/Storage");
const { User } = require("../Model/User");
const { Convert_vUpdate } = require("../Util/Convert_data");
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
const SV__Create_Storage = (User_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const CheckUser = await User.findOne({ User_Id });
      if (!CheckUser) {
        return resolve({
          status: 404,
          message: "Not found user",
          error: {
            Storage: "Not found user!",
          },
          data: {},
        });
      }

      const checkStorage = await Storage.findOne({ User_Id });
      if (checkStorage) {
        return resolve({
          status: 404,
          message: "Storage is exists!",
          error: {
            Storage: "Storage is exists!",
          },
          data: {},
        });
      }

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
          "something went wrong in Service_Storage.js (SV_Create_Storage)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Update_Storage = (User_Id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const CheckUser = await User.findOne({ User_Id });
      if (!CheckUser) {
        return resolve({
          status: 404,
          message: "Not found user",
          error: {
            Storage: "Not found user!",
          },
          data: {},
        });
      }

      const UpdateData = Convert_vUpdate(data, [
        "_id",
        "createdAt",
        "User_Id",
        "Limit",
      ]);
      const result = await Storage.findOneAndUpdate({ User_Id }, UpdateData, {
        new: true,
      });

      if (!result) {
        return resolve({
          status: 404,
          message: "Not found storage for user!",
          error: {
            Storage: "Not found storage for user!",
          },
          data: {},
        });
      }

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

const SV__Update_Storage_Premium = (User_Id, Premium_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ User_Id });
      if (!checkUser) {
        return resolve({
          status: 404,
          message: "Not found user",
          error: {
            Storage: "Not found user!",
          },
          data: {},
        });
      }

      const checkStorage = await Storage.findOne({ User_Id });
      if (!checkStorage) {
        return resolve({
          status: 404,
          message: "Storage not exist!",
          error: {
            Storage: "Storage not exist!",
          },
          data: {},
        });
      }

      const getPremium = await Premium.findOne({ Premium_Id });
      if (!getPremium) {
        return resolve({
          status: 404,
          message: "Not found premium",
          error: {
            Storage: "Not found premium!",
          },
          data: {},
        });
      }

      const UpdateData = Convert_vUpdate(
        { Limit: checkStorage.Limit + getPremium.Storage },
        ["_id", "createdAt", "User_Id", "Userd"]
      );
      const result = await Storage.findOneAndUpdate({ User_Id }, UpdateData, {
        new: true,
      });

      if (!result) {
        return resolve({
          status: 404,
          message: "Not found storage for user!",
          error: {
            Storage: "Not found storage for user!",
          },
          data: {},
        });
      }

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
const SV__Delete_Storage = (User_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Storage.findOneAndDelete({ User_Id });
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
  SV__Update_Storage_Premium,
  SV__Delete_Storage,
  SV__Create_Storage,
};
