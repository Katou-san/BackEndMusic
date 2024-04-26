const { Role } = require("../Model/Role");
const { User } = require("../Model/User");
const { Create_Id } = require("../Util/Create_Id");

//todo done!
const SV__Get_Role = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id) {
        const result = await Role.findOne({ Role_Id: id });
        if (!result) {
          return resolve({ status: 200, message: "Not found Role with id" });
        }
        return resolve({
          status: 200,
          message: "Get Role complete!",
          data: result,
        });
      }

      const allRoles = await Role.find();
      resolve({
        status: 200,
        message: "get all Roles complete!",
        data: allRoles,
      });
    } catch (err) {
      reject({
        status: 404,
        message: "something went wrong in Admin_Service_Role.js (SV_Get_Role)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Create_Role = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { Role_Name, Description } = data;
      const findRole = await Role.findOne({ Role_Name });
      if (findRole) {
        return resolve({ status: 200, message: "Role is existing" });
      }

      const result = await Role.create({
        Role_Id: Create_Id("Role", Role_Name),
        Role_Name,
        Description: Description ? Description : "",
      });
      resolve({
        status: 200,
        message: result ? "Create Role complete!" : "Create Role failed",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Role.js (SV_Create_Role)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Update_Role = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await Role.findOneAndUpdate({ Role_Id: id }, data, {
        new: true,
      });
      if (!result) {
        return resolve({ status: 200, message: "Not found Role with id" });
      }
      resolve({
        status: 200,
        message: result ? "Updated Role complete!" : "Updated Role failed",
        data: result,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Role.js (SV_Update_Role)",
      });
      throw new Error(err);
    }
  });
};

//! Need Check
const SV__Delete_Role = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Check_Role = await User.findOne({ Role: id });
      if (Check_Role) {
        return resolve({
          status: 404,
          message: "Role is using!",
          error: "Role is using",
        });
      }

      const result = await Role.findOneAndDelete({ Role_Id: id });
      if (!result) {
        return resolve({ status: 404, message: "Not found Role with id" });
      }
      resolve({
        status: 200,
        message: result ? "Delete Role complete!" : "Delete Role failed",
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_Role.js (SV_Delete_Role)",
      });
      throw new Error(err);
    }
  });
};

module.exports = {
  SV__Get_Role,
  SV__Update_Role,
  SV__Delete_Role,
  SV__Create_Role,
};
