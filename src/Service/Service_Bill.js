const { Bill } = require("../Model/Bill");
const { Premium } = require("../Model/Premium");
//todo done!
const SV__Get_Bill = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id) {
        const result = await Bill.find({ User_Id: id });
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

      const allBill = await Bill.find();
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

//! Need Check
const SV__Create_Bill = (User_Id, Premium_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const today = new Date();
      const Check_Premium = await Premium.findOne({ Premium_Id });
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
        User_Id,
        Premium_Id,
        Create_Date: today.toUTCString(),
        Expiration_Date: new Date(
          new Date().setDate(today.getDate() + Check_Premium.Duration)
        ).toUTCString(),
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

// //! Need Check
// const SV__Update_Bill = (User_Id, data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const result = await Bill.findOneAndUpdate({ User_Id }, data, {
//         new: true,
//       });

//       resolve({
//         status: 200,
//         message: "Updated Bill complete!",
//         data: result,
//       });
//     } catch (err) {
//       reject({
//         status: 404,
//         message:
//           "something went wrong in Admin_Service_Bill.js (SV_Update_Bill)",
//       });
//       throw new Error(err);
//     }
//   });
// };

//! Need Check
const SV__Delete_Bill = (Bill_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Bill.findOneAndDelete({ Bill_Id });
      if (!result) {
        return resolve({ status: 404, message: "Not found Bill with id" });
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
  // SV__Update_Bill,
  SV__Delete_Bill,
  SV__Create_Bill,
};
