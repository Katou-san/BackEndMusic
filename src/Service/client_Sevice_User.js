const { Hash_Password, Confirm_Hash_Password } = require("../Middleware/Hash");
const { JWT_Create_Token } = require("../Middleware/JWT_ActionS");
const { User } = require("../Model/User");
const { Role } = require("../Model/Role");
const { Convert_vUpdate } = require("../Util/Convert_data");
const { Create_Id } = require("../Util/Create_Id");
const {
  SV__Create_Storage,
  SV__Delete_Storage,
} = require("../Service/Service_Storage");
const {
  SV__Create_Playlist_DF,
  SV__Delete_Playlist_DF,
} = require("./Service_Playlist");
const { match, join, project, matchMany } = require("../Util/QueryDB");
const get_Lable_User = {
  _id: 0,
  User_Id: 1,
  User_Name: 1,
  User_Email: 1,
  Avatar: 1,
  is_Premium: 1,
  Status: 1,
  Role_Id: 1,
  is_Admin: 1,
  createdAt: 1,
};

const get_Lable_Emply = {
  _id: 0,
  User_Id: 1,
  User_Name: 1,
  Avatar: 1,
  Phone: 1,
  is_Premium: 1,
  Status: 1,
  Role_Id: 1,
  createdAt: 1,
  Create_date: 1,
};

const SV__Get_User__Client = (id, type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.find({ User_Id: id });
      if (!checkUser) {
        return resolve({
          status: 404,
          message: "get user fail!",
          error: {
            find_User: "User not found",
          },
          data: {},
        });
      }
      const result = await User.aggregate([
        match("User_Id", id),
        join("roles", "Role_Id", "Role_Id", "GetRole"),
        project(get_Lable_Emply, { Role_Name: "$GetRole.Role_Name" }),
      ]);

      resolve({
        status: 200,
        message: "get user complete!",
        error: {},
        data: result[0],
      });
    } catch (err) {
      reject({
        status: 404,
        message: "something went wrong in Admin_Service_User.js (SV_Get_User)",
      });
      throw new Error(err);
    }
  });
};

module.exports = { SV__Get_User__Client };
