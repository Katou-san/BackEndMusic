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
const { match, join, project } = require("../Util/QueryDB");
const get_Lable_User = {
  _id: 0,
  User_Id: 1,
  User_Name: 1,
  User_Email: 1,
  Avatar: 1,
  is_Premium: 1,
  Status: 1,
  Role_Id: 1,
  createdAt: 1,
};

const getRole = {
  _id: 0,
  Role_Name: 1,
};

//! Need Check
const SV__Get_User = (id, type) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = null;
      if (id != null && type != null) {
        if (type == "email") {
          result = await User.aggregate([
            match("User_Email", id),
            join("roles", "Role_Id", "Role_Id", "GetRole"),
            project(get_Lable_User, { Role_Name: "$GetRole.Role_Name" }),
          ]);
        } else if (type == "id") {
          result = await User.aggregate([
            match("User_Id", id),
            join("roles", "Role_Id", "Role_Id", "GetRole"),
            project(get_Lable_User, { Role_Name: "$GetRole.Role_Name" }),
          ]);
        }

        if (!result) {
          return resolve({
            status: 200,
            message: `Not found user with ${type}`,
          });
        }

        return resolve({
          status: 200,
          message: "get user Complete!",
          data: result,
        });
      }

      const allUsers = await User.aggregate([
        join("roles", "Role_Id", "Role_Id", "GetRole"),
        project(get_Lable_User, { Role_Name: "$GetRole.Role_Name" }),
        {
          $unwind: "$Role_Name",
        },
      ]);
      resolve({
        status: 200,
        message: "get all users complete!",
        data: allUsers,
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

//TODO Done!
const SV__Login_User = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { User_Email, User_Pass } = data;
      const result = await User.findOne({ User_Email });

      if (!result) {
        return resolve({ status: 404, message: "Not found email" });
      }

      if (!Confirm_Hash_Password(User_Pass, result?.User_Pass)) {
        return resolve({
          status: 404,
          message: "Pass not match",
          error: { pass: "Pass not match" },
        });
      }
      const Access_Token = JWT_Create_Token({
        User_Email: result.User_Email,
        Role: result.Role_Id,
        User_Id: result.User_Id,
      });

      resolve({
        status: 200,
        message: "Login complete!",
        data: {
          is_Login: true,
          Access_Token: Access_Token,
          User_Id: result.User_Id,
          User_Name: result.User_Name,
          Avatar: result.Avatar,
        },
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_User.js (SV_Login_User)",
      });
      throw new Error(err);
    }
  });
};

const SV__Oauth = (id, email, role) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await User.findOne({
        User_Id: id,
        User_Email: email,
        Role: role,
      });
      if (!result) {
        return resolve({ status: 200, message: "Error Oauth!" });
      }

      const Access_Token = JWT_Create_Token({
        User_Email: result.User_Email,
        Role: result.Role_Id,
        User_Id: result.User_Id,
      });

      resolve({
        status: 200,
        message: "Oauth complete!",
        data: {
          is_Login: true,
          Access_Token: Access_Token,
          User_Id: result.User_Id,
          User_Name: result.User_Name,
          Avatar: result.Avatar,
        },
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

//! Need Check
const SV__Create_User = (data) => {
  return new Promise(async (resolve, reject) => {
    const getRole = await Role.findOne({ Role_Name: "client" });
    const {
      User_Email,
      User_Name,
      User_Pass,
      Role_Id = getRole.Role_Id,
    } = data;
    try {
      const check = await User.findOne({ User_Email });

      if (check) {
        return resolve({
          status: 404,
          message: "Email is extisting",
        });
      }
      const result = await User.create({
        User_Id: Create_Id("User", User_Name),
        User_Email,
        User_Pass: Hash_Password(User_Pass),
        User_Name,
        Role_Id: Role_Id,
      });

      const statePlaylist = await SV__Create_Playlist_DF(
        result.User_Id,
        result.User_Name
      );

      if (!statePlaylist.state) {
        return resolve({
          status: 404,
          message: stateStorage.message,
          error: {
            User: "Create playlist failed!",
            detail: statePlaylist.error,
          },
        });
      }

      const stateStorage = await SV__Create_Storage(result.User_Id);
      if (!stateStorage.state) {
        return resolve({
          status: 404,
          message: stateStorage.message,
          error: {
            User: "Create storage failed!",
            detail: stateStorage.error,
          },
        });
      }

      const Access_Token = JWT_Create_Token({
        User_Email: result.User_Email,
        Role: result.Role_Id,
        User_Id: result.User_Id,
      });

      resolve({
        status: 200,
        message: "Create user success",
        data: {
          is_Login: true,
          Access_Token: Access_Token,
          User_Id: result.User_Id,
          User_Name: result.User_Name,
          Avatar: result.Avatar,
        },
      });
    } catch (err) {
      reject({
        status: 404,
        message: "Create User failed",
      });
    }
  });
};

//! Need Check
const SV__Update_User = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { User_Email } = data;
      const findUser = await User.findOne({ User_Email });
      if (!findUser) {
        return resolve({ status: 200, message: "not found user with email" });
      }

      const UpdateData = Convert_vUpdate(data, [
        "User_Id",
        "Number_Phone",
        "User_Email",
        "_id",
      ]);

      const result = await User.findOneAndUpdate({ User_Email }, UpdateData, {
        new: true,
      });

      if (!result) {
        return resolve({
          status: 404,
          message: "Update Failed!",
          error: "Update failed",
        });
      }

      resolve({
        status: 200,
        message: "successfully updated",
        data: UpdateData,
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_User.js (SV_Update_User)",
      });
      throw new Error(err);
    }
  });
};

//! Need Update
const SV__Delete_User = (User_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let error = {};
      const checkUser = await User.findOne({ User_Id });
      if (!checkUser) {
        return resolve({ status: 404, message: "Not found user with id" });
      }

      const deletePlaylistDF = await SV__Delete_Playlist_DF(User_Id);
      if (!deletePlaylistDF.state) {
        error = {
          playlist: {
            User: "Delete playlist failed!",
            detail: deletePlaylistDF.error,
          },
        };
      }

      const deleteStorage = await SV__Delete_Storage(User_Id);
      if (!deleteStorage.state) {
        error = { ...error, ...deleteStorage.error };
        return resolve({
          status: 404,
          error,
          message: "Delete storage failed",
        });
      }

      const result = await User.findOneAndDelete({ User_Id });
      if (!result) {
        return resolve({
          status: 404,
          error,
          message: "Not found user!",
        });
      }

      resolve({
        status: 200,
        error,
        message: "Delete user complete!",
      });
    } catch (err) {
      reject({
        status: 404,
        message:
          "something went wrong in Admin_Service_User.js (SV_Delete_User)",
      });
      throw new Error(err);
    }
  });
};

module.exports = {
  SV__Get_User,
  SV__Create_User,
  SV__Update_User,
  SV__Delete_User,
  SV__Login_User,
  SV__Oauth,
};
