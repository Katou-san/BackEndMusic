const { Confirm_Hash_Password, Hash_Password } = require("../Middleware/Hash");
const { JWT_Create_Token } = require("../Middleware/JWT_ActionS");
const { Employess } = require("../Model/Employess");
const { Convert_vUpdate } = require("../Util/Convert_data");
const { Create_Id } = require("../Util/Create_Id");

const SV__Get_Employess = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id) {
        const result = await Employess.findOne({ Employess_Id: id });
        if (!result) {
          return resolve({
            status: 200,
            message: "Not found Employess with id",
          });
        }
        return resolve({
          status: 200,
          message: "Get Employess complete!",
          data: result,
        });
      }

      const allEmployesss = await Employess.find();
      resolve({
        status: 200,
        message: "get all Employesss complete!",
        data: allEmployesss,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Employess.js (SV_Get_Employess)",
      });
      throw new Error(err);
    }
  });
};

const SV__Login_Employess = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Employess_Email, Employess_Pass } = data;
      const find = await Employess.findOne({ Employess_Email });
      if (!find) {
        return resolve({
          status: 404,
          message: "Employess is not found",
        });
      }

      if (!Confirm_Hash_Password(Employess_Pass, find?.Employess_Pass)) {
        return resolve({
          status: 404,
          message: "Password isn`t match",
        });
      }

      const Access_Token = JWT_Create_Token({
        Employess_Id: find.Employess_Id,
        Employess_Name: find.Employess_Email,
        Role: find.Role,
      });

      return resolve({
        status: 200,
        message: "Login success",
        data: {
          is_Login: true,
          Access_Token: Access_Token,
          Data_User: {
            Employess_Id: find.Employess_Id,
            Employess_Name: find.Employess_Name,
            Avatar: find.Avatar,
          },
        },
      });
    } catch (err) {
      reject(err);
    }
  });
};

const SV__Create_Employess = (data) => {
  return new Promise(async (resolve, reject) => {
    const { Employess_Email, Employess_Name, Employess_Pass, Role } = data;
    try {
      const findCate = await Employess.findOne({ Employess_Email });
      if (findCate) {
        return resolve({
          status: 404,
          message: "Employess is exist",
        });
      }
      const result = await Employess.create({
        Employess_Id: Create_Id("Employess", Employess_Name),
        Employess_Email,
        Employess_Name,
        Employess_Pass: Hash_Password(Employess_Pass),
        Role: Role ? Role : null,
      });
      const Access_Token = JWT_Create_Token({
        Employess_Id: result.Employess_Id,
        Employess_Name: result.Employess_Email,
        Role: result.Role,
      });

      return resolve({
        status: 200,
        message: "create Employess success",
        data: {
          is_Login: true,
          Access_Token: Access_Token,
          Data_User: {
            Employess_Id: result.Employess_Id,
            Employess_Name: result.Employess_Name,
            Avatar: result.Avatar,
          },
        },
      });
    } catch (err) {
      reject(err);
    }
  });
};

const SV__Update_Employess = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Employess_Id, Employess_Pass } = data;

      const UpdateData = Convert_vUpdate(data, [
        "Employess_Id",
        "Number_Phone",
        "Employess_Email",
        "_id",
      ]);

      const result = await Employess.findOneAndUpdate(
        { Employess_Id },
        { ...UpdateData, Employess_Pass: Hash_Password(Employess_Pass) },
        { new: true }
      );

      if (!result) {
        resolve({ status: 404, message: "Not found Employess with id" });
      }
      resolve({
        status: 200,
        message: "Updated Employess complete!",
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Employess.js (SV_Update_Employess)",
      });
      throw new Error(err);
    }
  });
};

const SV__Delete_Employess = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Employess.findOneAndDelete({ Employess_Id: id });
      if (!result) {
        resolve({ status: 404, message: "Not found Employess with id" });
      }
      resolve({
        status: 200,
        message: "Delete Employess complete!",
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Employess.js (SV_Delete_Employess)",
      });
      throw new Error(err);
    }
  });
};

module.exports = {
  SV__Get_Employess,
  SV__Update_Employess,
  SV__Delete_Employess,
  SV__Create_Employess,
  SV__Login_Employess,
};
