const { JWT_Create_Token } = require("../Middleware/JWT_ActionS");
const { User } = require("../Model/User");
const { Playlist } = require("../Model/Playlist");
const { Hash_Password, Confirm_Hash_Password } = require("../Middleware/Hash");
const { Create_default_playlist } = require("./Service_Playlist");

const Create_User_Service = (data) => {
  return new Promise(async (resolve, reject) => {
    const { User_Id, User_Email, User_Name, User_Pass } = data;
    try {
      const check = await User.findOne({ User_Email });
      const check_default_playlist = await Playlist.findOne().or([
        { Playlist_Id: User_Id + "_Like" },
        { Playlist_Id: User_Id + "_Upload" },
      ]);

      if (check) {
        resolve({
          status: 404,
          message: "Email is already",
        });
      }

      if (check_default_playlist) {
        resolve({
          status: 404,
          message: "Default user playlist create is extist",
        });
      }

      if (!Create_default_playlist(User_Id)) {
        resolve({
          status: 404,
          message: "Default user playlist create got error",
        });
      }

      const user = await User.create({
        User_Id,
        User_Email,
        User_Pass: Hash_Password(User_Pass),
        User_Name,
        Avatar: "Avatar_Default.jpg",
        List_Add_Songs: [User_Id + "_Upload"],
        List_Like_Song: [User_Id + "_Like"],
      });

      const Access_Token = JWT_Create_Token({
        User_Email: user.User_Email,
        Role: user.Role,
        User_Id: user.User_Id,
      });

      resolve({
        status: 200,
        message: "Create user success",
        data: {
          is_Login: true,
          Access_Token: Access_Token,
          Data_User: {
            User_Id: user.User_Id,
            User_Name: user.User_Name,
            Avatar: user.Avatar,
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

const Update_User_Service = (User_Id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Find_User = await User.findOne({ User_Id });
      if (Find_User === null) {
        resolve({
          status: 404,
          message: "User is not found",
        });
      }
      await User.findOneAndUpdate({ User_Id }, data, {
        new: true,
      });
      resolve({
        status: 200,
        message: "Update user success",
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

const Get_Playlist_User_Service = (User_Id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const check_User = await User.findOne({ User_Id });
      if (check_User == null) {
        resolve({
          status: 404,
          message: "not found Email",
        });
      }
      const { Playlist, List_Add_Songs, List_Like_Song } = check_User;
      resolve({
        status: 200,
        message: "Login success",
        data: {
          Playlist,
          List_Add_Songs,
          List_Like_Song,
        },
      });
    } catch (err) {
      reject(err);
    }
  });
};

const Check_Token_User_Service = (User_Email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const check_User = await User.findOne({ User_Email });
      if (check_User == null) {
        resolve({
          status: 404,
          message: "not found Email",
        });
      }

      const {
        User_Id,
        User_Name,
        Avatar,
        Playlist,
        List_Add_Songs,
        List_Like_Song,
      } = check_User;
      resolve({
        status: 200,
        message: "Login success",
        data: {
          is_Login: true,
          Data_User: {
            User_Id,
            User_Name,
            Avatar,
            Playlist,
            List_Add_Songs,
            List_Like_Song,
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
  Get_Playlist_User_Service,
  Check_Token_User_Service,
};
