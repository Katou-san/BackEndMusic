const { Bill } = require("../Model/Bill");
const { Storage } = require("../Model/Storage");
const { Subscription } = require("../Model/Subscription");
const { User } = require("../Model/User");
const { Create_Id } = require("../Util/Create_Id");
const { plus_Date } = require("../Util/Get_Time");
const { join, project } = require("../Util/QueryDB");
//todo done!

const getValue = {
  _id: 0,
  Bill_Id: 1,
  User_Id: 1,
  Sub_Id: 1,
  Create_Date: 1,
  Expiration_Date: 1,
};

const SV__Get_Bill = (Sub_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (Sub_Id) {
        const result = await Bill.findOne({ Sub_Id });
        if (!result) {
          return resolve({
            status: 404,
            message: "Not found bill for user",
          });
        }
        return resolve({
          status: 200,
          message: "Get bill complete!",
          data: result,
        });
      }

      const allBill = await Bill.aggregate([
        join("users", "User_Id", "User_Id", "user"),
        project(getValue, { User_Name: "$user.User_Name" }),
        {
          $unwind: "$User_Name",
        },
      ]);

      resolve({
        status: 200,
        message: "get all bill complete!",
        data: allBill,
      });
    } catch (err) {
      reject({
        status: 404,
        message: "something went wrong in Admin_Service_Bill.js (SV_Get_Bill)",
      });
      throw new Error(err);
    }
  });
};

const SV__Get_Bill__Current = (User_Id, Sub_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = User.findOne({ User_Id });
      if (!checkUser) {
        return resolve({
          status: 404,
          message: "Not found user!",
          data: {},
          error: "Not found user!",
        });
      }

      if (Sub_Id) {
        const checkSub = Subscription.findOne({ Sub_Id });
        if (!checkSub) {
          return resolve({
            status: 404,
            message: "Not found subscription!",
            data: {},
            error: "Not found subscription!",
          });
        }

        const result = await Bill.findOne({
          User_Id,
          Sub_Id,
          Expiration_Date: { $gte: new Date() },
        });
        if (!result) {
          return resolve({
            status: 404,
            message: "Not found bill for user",
          });
        }
        return resolve({
          status: 200,
          message: "get bill complete!",
          data: result,
        });
      }

      const result = await Bill.find({ User_Id });
      resolve({
        status: 200,
        message: "get all bill complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message: "something went wrong in Admin_Service_Bill.js (SV_Get_Bill)",
      });
      throw new Error(err);
    }
  });
};

const SV__Check_Bill = (User_Id, Sub_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUserUser = await Bill.find({ User_Id });
      if (!checkUserUser) {
        return resolve({
          status: 200,
          message: "Dont have bill",
          data: { Bill: false },
        });
      }

      if (!Sub_Id) {
        const result = await Bill.find({
          User_Id,
          Expiration_Date: { $gte: new Date() },
        });

        if (result.length == 0) {
          return resolve({
            status: 200,
            message: "Bill is expired",
            data: { Bill: false },
          });
        }

        return resolve({
          status: 200,
          message: "Has bill!",
          data: { Bill: true },
        });
      } else {
        const result = await Bill.findOne({
          User_Id,
          Sub_Id,
          Expiration_Date: { $gte: new Date() },
        });

        if (!result) {
          return resolve({
            status: 200,
            message: "Current bill is expired",
            data: { Bill: false },
          });
        }

        return resolve({
          status: 200,
          message: "Has current bill!",
          data: { Bill: true },
        });
      }
    } catch (err) {
      reject({
        status: 404,
        message: "something went wrong in Admin_Service_Bill.js (SV_Get_Bill)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Create_Bill = (User_Id, Sub_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const today = new Date();
      const Check_Premium = await Subscription.findOne({ Sub_Id });
      const Check_User = await User.findOne({ User_Id });
      if (!Check_Premium) {
        return resolve({
          status: 404,
          message: "Not found this premium!",
          data: {},
          error: "Not found this premium!",
        });
      }

      if (!Check_User) {
        return resolve({
          status: 404,
          message: "Not found user!",
          data: {},
          error: "Not found user!",
        });
      }

      const result = await Bill.create({
        Bill_Id: Create_Id("Bill"),
        User_Id,
        Sub_Id,
        Create_Date: today.toUTCString(),
        Expiration_Date: plus_Date(Check_Premium.Duration).toUTCString(),
      });

      resolve({
        status: 200,
        message: "Create Bill complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Bill.js (SV_Create_Bill)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Delete_Bill = (Bill_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const getBill = await Bill.findOne({ Bill_Id });
      if (!getBill) {
        return resolve({ status: 404, message: "Not found Bill with id" });
      }

      const result = await Bill.findOneAndDelete({ Bill_Id });
      if (!result) {
        return resolve({ status: 404, message: "Not found Bill with id" });
      }

      const getSub = await Subscription.findOne({ Sub_Id: getBill.Sub_Id });
      if (!getSub) {
        return resolve({
          status: 404,
          message: "Not found subscription with id",
        });
      }

      const getStorage = await Storage.findOne({ User_Id: getBill.User_Id });
      if (!getStorage) {
        return resolve({
          status: 404,
          message: "Not found subscription with id",
        });
      }
      const UpdateStorage = await Storage.findOneAndUpdate(
        { User_Id: getBill.User_Id },
        { Limit: getStorage.Limit - getSub.Storage },
        { new: true }
      );
      if (!UpdateStorage) {
        return resolve({
          status: 404,
          message: "Not found subscription with id",
        });
      }

      resolve({
        status: 200,
        message: "Delete Bill complete!",
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Bill.js (SV_Delete_Bill)",
      });
      throw new Error(err);
    }
  });
};

module.exports = {
  SV__Get_Bill,
  SV__Check_Bill,
  SV__Get_Bill__Current,
  SV__Delete_Bill,
  SV__Create_Bill,
};
