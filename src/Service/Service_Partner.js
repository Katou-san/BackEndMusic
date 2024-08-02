const { Ads } = require("../Model/Ads");
const { Partner } = require("../Model/Partner");
const { User } = require("../Model/User");
const { Convert_vUpdate } = require("../Util/Convert_data");
const { Create_Id } = require("../Util/Create_Id");
const { Delete_File } = require("../Util/Handle_File");

//todo done!
const SV__Get_Partner = (Partner_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (Partner_Id) {
        const result = await Partner.findOne({ Partner_Id });
        if (!result) {
          return resolve({
            status: 404,
            message: "Not found with id",
            error: { partner: "Not found with id" },
            data: {},
          });
        }
        return resolve({
          status: 200,
          message: "Get partner complete!",
          data: result,
        });
      }

      const result = await Partner.find();
      return resolve({
        status: 200,
        message: "Get partner complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Partner.js (SV_Get_Partner)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Create_Partner = (User_Id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Partner_Name, Phone, Contract_num, Logo, Status = true } = data;
      const checkUser = await User.findOne({ User_Id });
      const checkPartner = await Partner.findOne({
        Partner_Name: { $regex: Partner_Name, $options: "i" },
      });

      if (checkPartner) {
        return resolve({
          status: 200,
          message: "Name aready using!",
          error: {
            user: "Name aready using!",
          },
          data: {},
        });
      }

      if (!checkUser) {
        return resolve({
          status: 200,
          message: "Not found user!",
          error: {
            user: "Not found user!",
          },
          data: {},
        });
      }

      const result = await Partner.create({
        Partner_Id: Create_Id("partner"),
        Partner_Name,
        Phone,
        Logo,
        Contract_num,
        Status,
      });
      resolve({
        status: 200,
        message: "Create Partner complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Partner.js (SV_Create_Partner)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Update_Partner = (Partner_Id, User_Id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Logo } = data;
      const checkUser = await User.findOne({ User_Id });
      const checkPartner = await Partner.findOne({ Partner_Id });
      if (!checkUser) {
        return resolve({
          status: 200,
          message: "Not found user!",
          error: {
            user: "Not found user!",
          },
          data: {},
        });
      }

      if (!checkPartner) {
        return resolve({
          status: 200,
          message: "Not found partner with id!",
          error: {
            user: "Not found partner with id!",
          },
          data: {},
        });
      }
      const updateValue = Convert_vUpdate(data, [
        "_id",
        "Partner_Id",
        "User_Id",
        "Create_Date",
        "Contract_num",
      ]);

      const result = await Partner.findOneAndUpdate(
        { Partner_Id },
        updateValue,
        {
          new: true,
        }
      );

      if (!result) {
        return resolve({
          status: 200,
          message: "Not found partner with id!",
          error: {
            user: "Not found partner with id!",
          },
          data: {},
        });
      }

      if (
        Logo != undefined &&
        Logo != checkPartner.Logo &&
        Logo != "null" &&
        Logo != null &&
        Logo != "" &&
        checkPartner.Logo != "default.png"
      ) {
        Delete_File("Partner", checkPartner.Logo);
      }

      resolve({
        status: 200,
        message: "Updated Partner complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Partner.js (SV_Update_Partner)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Delete_Partner = (Partner_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkPartner = await Partner.findOne({ Partner_Id });
      const checkAds = await Ads.findOne({
        Partner_Id: checkPartner.Partner_Id,
      });
      if (checkAds) {
        return resolve({
          status: 200,
          message: "Cant delete partner",
          error: {
            user: "Cant delete partner",
          },
          data: {},
        });
      }

      if (!checkPartner) {
        return resolve({
          status: 200,
          message: "Not found partner with id!",
          error: {
            user: "Not found partner with id!",
          },
          data: {},
        });
      }

      const result = await Partner.findOneAndDelete({ Partner_Id });
      if (!result) {
        return resolve({
          status: 200,
          message: "Not found partner with id!",
          error: {
            user: "Not found partner with id!",
          },
          data: {},
        });
      }

      if (
        checkPartner.Logo != undefined &&
        checkPartner.Logo != "null" &&
        checkPartner.Logo != null &&
        checkPartner.Logo != "" &&
        checkPartner.Logo != "default.png"
      ) {
        Delete_File("Partner", checkPartner.Logo);
      }

      resolve({
        status: 200,
        message: "Delete Partner complete!",
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Partner.js (SV_Delete_Partner)",
      });
      throw new Error(err);
    }
  });
};

module.exports = {
  SV__Get_Partner,
  SV__Update_Partner,
  SV__Delete_Partner,
  SV__Create_Partner,
};
