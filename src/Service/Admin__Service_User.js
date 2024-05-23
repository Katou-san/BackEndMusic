const { Hash_Password, Confirm_Hash_Password } = require("../Middleware/Hash");
const { JWT_Create_Token } = require("../Middleware/JWT_ActionS");
const { Playlist } = require("../Model/Playlist");
const { User } = require("../Model/User");
const { Convert_vUpdate } = require("../Util/Convert_data");
const { Create_Id } = require("../Util/Create_Id");
const { Get_Current_Time } = require("../Util/Get_Time");
const { SV__Create_Playlist_DF } = require("./Admin__Service_Playlist");

const get_Lable_User = {
  _id: 0,
  User_Id: 1,
  User_Name: 1,
  User_Email: 1,
  Avatar: 1,
  is_Premium: 1,
  Status: 1,
  Role: 1,
  createdAt: 1,
};

//! Need Check
const SV__Get_User = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (id != null) {
        const result = await User.findOne({ User_Email: id }).select(
          get_Lable_User
        );
        if (!result) {
          return resolve({ status: 200, message: "not found user with id" });
        }
        return resolve({
          status: 200,
          message: "get user Complete!",
          data: result,
        });
      }

      const allUsers = await User.find().select(get_Lable_User);
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
        return resolve({ status: 200, message: "Not found email" });
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
        Role: result.Role,
        User_Id: result.User_Id,
      });

      resolve({
        status: 200,
        message: result ? "Login complete!" : "Login failed!",
        data: {
          is_Login: true,
          Access_Token: Access_Token,
          Data_User: {
            User_Id: result.User_Id,
            User_Name: result.User_Name,
            Avatar: result.Avatar,
          },
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
        Role: result.Role,
        User_Id: result.User_Id,
      });

      resolve({
        status: 200,
        message: "Oauth complete!",
        data: {
          is_Login: true,
          Access_Token: Access_Token,
          Data_User: {
            User_Id: result.User_Id,
            User_Name: result.User_Name,
            Avatar: result.Avatar,
          },
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
    const {
      User_Email,
      User_Name,
      User_Pass,
      Role = "@Role2024341551982655client",
    } = data;
    try {
      const check = await User.findOne({ User_Email });

      if (check) {
        return resolve({
          status: 404,
          message: "Email is extisting",
        });
      }

      const posttime = Get_Current_Time();

      const result = await User.create({
        User_Id: Create_Id("User", User_Name, posttime),
        User_Email,
        User_Pass: Hash_Password(User_Pass),
        User_Name,
        Role,
        Avatar: "Avatar_Default.jpg",
        List_Add_Songs: [Create_Id("User", User_Name, posttime) + "_Upload"],
        List_Like_Song: [Create_Id("User", User_Name, posttime) + "_Like"],
      });

      if (!SV__Create_Playlist_DF(result.User_Id)) {
        return resolve({
          status: 404,
          message: "Default user playlist create got error",
        });
      }

      const Access_Token = JWT_Create_Token({
        User_Email: result.User_Email,
        Role: result.Role,
        User_Id: result.User_Id,
      });

      resolve({
        status: 200,
        message: "Create user success",
        data: {
          is_Login: true,
          Access_Token: Access_Token,
          Data_User: {
            User_Id: result.User_Id,
            User_Name: result.User_Name,
            Avatar: result.Avatar,
          },
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
const SV__Delete_User = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const findUser = await User.findOne({ User_Email: id });
      if (!findUser) {
        return resolve({ status: 200, message: "Not found user with id" });
      }

      await User.deleteOne({ _id: findUser._id });
      await Playlist.deleteOne({ Playlist_Id: findUser.List_Like_Song[0] });
      await Playlist.deleteOne({ Playlist_Id: findUser.List_Add_Songs[0] });

      resolve({
        status: 200,
        message: "Delete user complete",
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
