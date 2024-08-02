const { Ads } = require("../Model/Ads");
const { User } = require("../Model/User");
const { Convert_vUpdate } = require("../Util/Convert_data");
const { Create_Id } = require("../Util/Create_Id");

//todo done!
const SV__Get_Ads = (Ads_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (Ads_Id) {
        const result = await Ads.findOne({ Ads_Id });
        if (!result) {
          return resolve({
            status: 404,
            message: "Not found with id",
            error: { Ads: "Not found with id" },
            data: {},
          });
        }
        return resolve({
          status: 200,
          message: "Get Ads complete!",
          data: result,
        });
      }

      const result = await Ads.find();
      return resolve({
        status: 200,
        message: "Get Ads complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message: "something went wrong in Admin_Service_Ads.js (SV_Get_Ads)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Create_Ads = (User_Id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {
        Ads_Name,
        Partner_Id,
        Ads_Image,
        Ads_Audio,
        Content,
        Start_time,
        End_time,
      } = data;
      const checkUser = await User.findOne({ User_Id });
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

      const result = await Ads.create({
        Ads_Id: Create_Id("Ads"),
        Partner_Id,
        Ads_Name: String(Ads_Name).toLowerCase().trim(),
        Ads_Image,
        Ads_Audio,
        User_Id,
        Content,
        Start_time,
        End_time,
      });
      resolve({
        status: 200,
        message: "Create Ads complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message: "something went wrong in Admin_Service_Ads.js (SV_Create_Ads)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Update_Ads = (Ads_Id, User_Id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ User_Id });
      const checkAds = await Ads.findOne({ Ads_Id });
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

      if (!checkAds) {
        return resolve({
          status: 200,
          message: "Not found Ads with id!",
          error: {
            user: "Not found Ads with id!",
          },
          data: {},
        });
      }
      const updateValue = Convert_vUpdate(data, [
        "_id",
        "Ads_Id",
        "User_Id",
        "Create_Date",
      ]);
      const result = await Ads.findOneAndUpdate({ Ads_Id }, updateValue, {
        new: true,
      });

      resolve({
        status: 200,
        message: "Updated Ads complete!",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message: "something went wrong in Admin_Service_Ads.js (SV_Update_Ads)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Delete_Ads = (Ads_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkAds = await Ads.findOne({
        Ads_Id: checkAds.Ads_Id,
      });
      if (new Date(checkAds.End_time).getTime() > new Date().getTime()) {
        await Ads.findOneAndDelete({ Ads_Id: checkAds.Ads_Id });
        await Ads.findByIdAndDelete({ Ads_Id: checkAds.Ads_Id });
      }

      if (!checkAds) {
        return resolve({
          status: 200,
          message: "Not found Ads with id!",
          error: {
            user: "Not found Ads with id!",
          },
          data: {},
        });
      }

      const result = await Ads.findOneAndDelete({ Ads_Id });
      resolve({
        status: 200,
        message: "Delete Ads complete!",
      });
    } catch (err) {
      reject({
        status: 404,
        message: "something went wrong in Admin_Service_Ads.js (SV_Delete_Ads)",
      });
      throw new Error(err);
    }
  });
};

module.exports = {
  SV__Get_Ads,
  SV__Update_Ads,
  SV__Delete_Ads,
  SV__Create_Ads,
};
