const { Subscription } = require("../Model/Subscription");
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
const SV__Create_Storage = async (User_Id) => {
  try {
    const CheckUser = await User.findOne({ User_Id });
    if (!CheckUser) {
      return {
        state: false,
        error: { storage: "User not found!" },
        message: "User not found!",
      };
    }

    const checkStorage = await Storage.findOne({ User_Id });
    if (checkStorage) {
      return {
        state: false,
        error: { storage: "Storage already exist!" },
        message: "Storage already exist",
      };
    }

    const result = await Storage.create({
      User_Id,
    });

    if (!result) {
      return {
        state: false,
        error: { storage: "Create storage failed!" },
        message: "Create storage failed!",
      };
    }

    return {
      state: true,
      error: {},
      message: "Create storage complete!",
    };
  } catch (err) {
    reject({
      status: 404,
      message: "something went wrong in Service_Storage.js (SV_Create_Storage)",
    });
    throw new Error(err);
  }
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

const SV__Update_Storage_Sub = (User_Id, Sub_Id) => {
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

      const getSub = await Subscription.findOne({ Sub_Id });
      if (!getSub) {
        return resolve({
          status: 404,
          message: "Not found subscription",
          error: {
            Storage: "Not found subscription!",
          },
          data: {},
        });
      }

      const UpdateData = Convert_vUpdate(
        { Limit: checkStorage.Limit + getSub.Storage },
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
const SV__Delete_Storage = async (User_Id) => {
  try {
    const result = await Storage.findOneAndDelete({ User_Id });
    if (!result) {
      return {
        state: false,
        message: "Not found Storage with id",
        error: {
          storage: "Not found storage for user!",
        },
      };
    }
    return {
      state: true,
      message: "Delete Storage complete!",
      error: {},
    };
  } catch (err) {
    reject({
      status: 404,
      message:
        "something went wrong in Admin_Service_Storage.js (SV_Delete_Storage)",
    });
    throw new Error(err);
  }
};

module.exports = {
  SV__Get_Storage,
  SV__Update_Storage,
  SV__Update_Storage_Sub,
  SV__Delete_Storage,
  SV__Create_Storage,
};
