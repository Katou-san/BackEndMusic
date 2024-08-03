const axios = require("axios");
const { User } = require("../Model/User");
const { Role } = require("../Model/Role");
const { SV__Create_Playlist_DF } = require("./Service_Playlist");
const { SV__Create_Storage } = require("./Service_Storage");
const { Create_Id } = require("../Util/Create_Id");
const { Hash_Password } = require("../Middleware/Hash");
const { JWT_Create_Token } = require("../Middleware/JWT_ActionS");

const SV__Login_Google = (tokenResponse) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userInfo = await axios
        .get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res) => res.data);
      const checkEmail = await User.findOne({ User_Email: userInfo.email });
      if (!checkEmail) {
        let TempName = userInfo.name;
        while (await User.findOne({ User_Email: TempName })) {
          TempName = `${TempName + Math.floor(Math.random() * 9999999)}`;
        }
        const getRole = await Role.findOne({ Role_Name: "client" });

        //tao user
        const result = await User.create({
          User_Id: Create_Id("User"),
          User_Email: String(userInfo.email).toLowerCase(),
          User_Pass: Hash_Password(`${userInfo.sub + TempName}`),
          User_Name: TempName,
          Avatar: userInfo.picture,
          Role_Id: getRole.Role_Id,
          is_Admin: false,
          Status: 1,
          Phone: "",
          CCCD: "",
        });

        //tao playlist mac dinh
        const statePlaylist = await SV__Create_Playlist_DF(
          result.User_Id,
          result.User_Name
        );
        //kiem tra tao playlist
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
        //tao storage
        const stateStorage = await SV__Create_Storage(
          result.User_Id,
          result.is_Admin
        );
        //kiem tra tao storage
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
        //tao token
        const Access_Token = JWT_Create_Token({
          User_Email: result.User_Email,
          Role: result.Role_Id,
          User_Id: result.User_Id,
        });
        return resolve({
          status: 200,
          message: "Create user with google success",
          data: {
            is_Login: true,
            Access_Token: Access_Token,
            User_Id: result.User_Id,
            User_Name: result.User_Name,
            Avatar: result.Avatar,
          },
        });
      } else {
        const Access_Token = JWT_Create_Token({
          User_Email: checkEmail.User_Email,
          Role: checkEmail.Role_Id,
          User_Id: checkEmail.User_Id,
        });
        return resolve({
          status: 200,
          message: "login with google success",
          data: {
            is_Login: true,
            Access_Token: Access_Token,
            User_Id: checkEmail.User_Id,
            User_Name: checkEmail.User_Name,
            Avatar: checkEmail.Avatar,
          },
        });
      }
    } catch (e) {
      reject({
        status: 404,
        message: "something went wrong in Service_Google.js (SV__Login_Google)",
      });
      throw new Error(e);
    }
  });
};

module.exports = {
  SV__Login_Google,
};
