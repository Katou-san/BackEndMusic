const { JWT_Verify_Token } = require("../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const Controller_User = require("../Controller/Controller_User");

Router.post("/Login", Controller_User.Login_User);
Router.post("/Sign_up", Controller_User.Sign_up_User);
Router.put("/Update_user", JWT_Verify_Token, Controller_User.Update_User);
Router.delete("/Delete_user/:id", Controller_User.Delete_User);
Router.post(
  "/get_playlist",
  JWT_Verify_Token,
  Controller_User.Get_Playlist_User
);
module.exports = Router;
