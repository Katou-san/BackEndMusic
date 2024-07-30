const { denyGetRoleUser } = require("../Configs/getRoles");
const { Role } = require("../Model/Role");
const { User } = require("../Model/User");
const { Convert_vUpdate } = require("../Util/Convert_data");
const { Create_Id } = require("../Util/Create_Id");

//todo done!
const SV__Get_Role = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id) {
        const result = await Role.findOne({ Role_Id: id });
        if (!result) {
          return resolve({ status: 404, message: "Not found Role with id" });
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

const SV__Get_Role_Current = (User_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({ User_Id });
      if (!checkUser) {
        return resolve({ status: 404, message: "Not found User with id" });
      }
      const result = await Role.findOne({ Role_Id: checkUser.Role_Id });
      if (!result) {
        return resolve({ status: 404, message: "Not found Role with id" });
      }
      return resolve({
        status: 200,
        message: "Get Role complete!",
        data: result,
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

const SV__Get_Role_User = (type = "user") => {
  return new Promise(async (resolve, reject) => {
    try {
      const results = await Role.find();
      let allRoleUser = [];
      let rolesUser = results.map((role) => {
        if (type == "admin") {
          if (denyGetRoleUser.includes(role.Role_Name)) {
            allRoleUser.push(role);
          }
        } else {
          if (!denyGetRoleUser.includes(role.Role_Name)) {
            allRoleUser.push(role);
          }
        }
      });
      resolve({
        status: 200,
        message: "get all Roles complete!",
        data: allRoleUser,
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
      const findRole = await Role.findOne({
        Role_Name: String(Role_Name).toLowerCase(),
      });
      if (findRole) {
        return resolve({ status: 404, message: "Role is existing" });
      }
      const result = await Role.create({
        Role_Id: Create_Id("Role", Role_Name),
        Role_Name: String(Role_Name).toLowerCase().trim(),
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
      const valueUpdate = Convert_vUpdate(data, ["Role_Name"]);
      const result = await Role.findOneAndUpdate({ Role_Id: id }, valueUpdate, {
        new: true,
      });
      if (!result) {
        return resolve({ status: 200, message: "Not found Role with id" });
      }
      resolve({
        status: 200,
        message: "Updated Role complete!",
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
      const Check_Role_User = await User.findOne({ Role_Id: id });
      const getRole = await Role.findOne({ Role_Id: id });
      if (Check_Role_User) {
        return resolve({
          status: 404,
          message: "Role is using!",
          error: "Role is using",
        });
      }

      if (
        getRole.Role_Name == "admin" ||
        getRole.Role_Name == "employess" ||
        getRole.Role_Name == "creator" ||
        getRole.Role_Name == "client"
      ) {
        return resolve({
          status: 404,
          message: "Cant delete default role!",
          error: "Cant delete default role!",
        });
      }

      const result = await Role.findOneAndDelete({ Role_Id: id });
      if (!result) {
        return resolve({ status: 404, message: "Not found Role with id" });
      }
      resolve({
        status: 200,
        message: "Delete Role complete!",
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
  SV__Get_Role_User,
  SV__Get_Role_Current,
};
