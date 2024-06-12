const { Premium } = require("../Model/Premium");
const { Bill } = require("../Model/Bill");
const { Convert_vUpdate } = require("../Util/Convert_data");
const { Create_Id } = require("../Util/Create_Id");

//todo done!
const SV__Get_Premium = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id) {
        const result = await Premium.findOne({ Premium_Id: id });
        if (!result) {
          return resolve({ status: 404, message: "Not found Premium with id" });
        }
        return resolve({
          status: 200,
          message: "Get Premium complete!",
          data: result,
        });
      }

      const allPremiums = await Premium.find();
      resolve({
        status: 200,
        message: "get all Premiums complete!",
        data: allPremiums,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Premium.js (SV_Get_Premium)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Create_Premium = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Premium_Title, Price, Content, Duration } = data;
      if (findPremium) {
        return resolve({ status: 404, message: "Premium is existing" });
      }
      const result = await Premium.create({
        Premium_Id: Create_Id("Premium", Premium_Title),
        Premium_Title,
        Price,
        Content,
        Duration,
      });
      resolve({
        status: 200,
        message: "Create Premium complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Premium.js (SV_Create_Premium)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Update_Premium = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const UpdateData = Convert_vUpdate(data, [
        "_id",
        "Premium_Id",
        "Duration",
      ]);
      const result = await Premium.findOneAndUpdate(
        { Premium_Id: id },
        UpdateData,
        {
          new: true,
        }
      );
      if (!result) {
        return resolve({ status: 200, message: "Not found Premium with id" });
      }
      resolve({
        status: 200,
        message: "Updated Premium complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Premium.js (SV_Update_Premium)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Delete_Premium = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Check_Premium = await Bill.findOne({ Premium_Id: id });

      if (Check_Premium) {
        return resolve({
          status: 404,
          message: "Premium is using!",
          data: {},
          error: "Premium is using",
        });
      }

      const result = await Premium.findOneAndDelete({ Premium_Id: id });
      if (!result) {
        return resolve({ status: 404, message: "Not found Premium with id" });
      }
      resolve({
        status: 200,
        message: "Delete Premium complete!",
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Premium.js (SV_Delete_Premium)",
      });
      throw new Error(err);
    }
  });
};

module.exports = {
  SV__Get_Premium,
  SV__Update_Premium,
  SV__Delete_Premium,
  SV__Create_Premium,
};
