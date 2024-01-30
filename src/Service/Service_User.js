const {
  JWT_Create_Token,
  JWT_Verify_Token,
} = require("../Middleware/JWT_ActionS");
const { User } = require("../Model/User");
const { Hash_Password, Confirm_Hash_Password } = require("./Service_Hash_Pass");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);

const Create_User_Service = (data) => {
  return new Promise(async (resolve, reject) => {
    const { User_Id, User_Email, User_Name, User_Pass } = data;
    const Hash_Pass = Hash_Password(User_Pass);
    try {
      const check = await User.findOne({ User_Email });

      if (check !== null) {
        resolve({
          status: 404,
          message: "Email is already",
        });
      }

      const user = await User.create({
        User_Id,
        User_Email,
        User_Pass: Hash_Pass,
        User_Name,
      });

      const Access_Token = JWT_Create_Token({
        User_Email: user.User_Email,
        Roles: user.Roles,
      });

      resolve({
        status: 200,
        message: "Create user success",
        data: {
          is_Login: true,
          Access_Token: Access_Token,
          Data_User: {
            User_Id,
            User_Name,
            Avatar: "Avatar_Default.jpg",
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

const Update_User_Service = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let idUser = "";
      const checkUserEmail = await User.findOne({ Email: id });
      if (checkUserEmail === null) {
        resolve({
          status: 404,
          message: "Not checkuser is null found",
        });
      }
      idUser = checkUserEmail._id;
      const user = await User.findOneAndUpdate({ _id: idUser }, data, {
        new: true,
      });
      resolve({
        status: 200,
        message: "update user success",
        data: user,
      });
    } catch (err) {
      reject(err);
    }
  });
};

const Deleta_User_Service = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUserEmail = await User.findOne({ Email: id });
      if (checkUserEmail === null) {
        resolve({
          status: 404,
          message: "Not checkuser is null found",
        });
      }
      const idUser = checkUserEmail._id;
      await User.findByIdAndDelete({ _id: idUser });
      resolve({
        status: 200,
        message: "Deleta user success",
      });
    } catch (err) {
      reject(err);
    }
  });
};

const Check_User_Service = (data) => {
  return new Promise(async (resolve, reject) => {
    const { User_Email, User_Pass } = data;

    try {
      const check_User = await User.findOne({ User_Email });
      if (check_User == null) {
        resolve({
          status: 404,
          message: "not found Email",
        });
      }

      if (Confirm_Hash_Password(User_Pass, check_User.User_Pass)) {
        const { User_Id, User_Name, Avatar, Roles } = check_User;
        const Access_Token = JWT_Create_Token({
          User_Email,
          Roles: Roles,
          User_Id,
        });
        resolve({
          status: 200,
          message: "Login success",
          data: {
            is_Login: true,
            Access_Token: Access_Token,
            Data_User: {
              User_Id,
              User_Name,
              Avatar,
            },
          },
        });
      }

      resolve({
        status: "404",
        message: "Login failed",
      });
    } catch (err) {
      reject(err);
    }
  });
};

const Check_Token_User_Service = (User_Email) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("Check_Token_User_Service");
      const check_User = await User.findOne({ User_Email });
      console.log(check_User);
      if (check_User == null) {
        resolve({
          status: 404,
          message: "not found Email",
        });
      }

      const { User_Id, User_Name, Avatar } = check_User;
      resolve({
        status: 200,
        message: "Login success",
        data: {
          is_Login: true,
          Data_User: {
            User_Id,
            User_Name,
            Avatar,
          },
        },
      });
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  Create_User_Service,
  Update_User_Service,
  Deleta_User_Service,
  Check_User_Service,
  Check_Token_User_Service,
};
