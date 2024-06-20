const { Subscription } = require("../Model/Subscription");
const { Bill } = require("../Model/Bill");
const { Convert_vUpdate } = require("../Util/Convert_data");
const { Create_Id } = require("../Util/Create_Id");

//todo done!
const SV__Get_Subscription = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id) {
        const result = await Subscription.findOne({ Sub_Id: id });
        if (!result) {
          return resolve({
            status: 404,
            message: "Not found subcription with id",
          });
        }
        return resolve({
          status: 200,
          message: "Get subcription complete!",
          data: result,
        });
      }

      const allSubs = await Subscription.find();
      resolve({
        status: 200,
        message: "get all subscriptions complete!",
        data: allSubs,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Subscription.js (SV_Get_Subscription)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Create_Subscription = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Sub_Title, Price, Content, Duration, Storage } = data;
      const result = await Subscription.create({
        Sub_Id: Create_Id("Sub", Sub_Title),
        Sub_Title,
        Storage,
        Price,
        Content,
        Duration,
      });
      resolve({
        status: 200,
        message: "Create subscription complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Subscription.js (SV_Create_Subscription)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Update_Subscription = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const UpdateData = Convert_vUpdate(data, ["_id", "Sub_Id", "Duration"]);
      const result = await Subscription.findOneAndUpdate(
        { Sub_Id: id },
        UpdateData,
        {
          new: true,
        }
      );
      if (!result) {
        return resolve({
          status: 200,
          message: "Not found subscription with id",
        });
      }
      resolve({
        status: 200,
        message: "Updated subscription complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Subscription.js (SV_Update_Subscription)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Delete_Subscription = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Check_Subscription = await Bill.findOne({ Sub_Id: id });

      if (Check_Subscription) {
        return resolve({
          status: 404,
          message: "subscription is using!",
          data: {},
          error: "subscription is using",
        });
      }

      const result = await Subscription.findOneAndDelete({ Sub_Id: id });
      if (!result) {
        return resolve({
          status: 404,
          message: "Not found subscription with id",
        });
      }
      resolve({
        status: 200,
        message: "Delete subscription complete!",
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Subscription.js (SV_Delete_Subscription)",
      });
      throw new Error(err);
    }
  });
};

module.exports = {
  SV__Get_Subscription,
  SV__Update_Subscription,
  SV__Delete_Subscription,
  SV__Create_Subscription,
};
