const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const Controller_User = require("../../Controller/Controller_User");
const {
  CTL__Login_User,
  CTL__Create_User,
  CTL__Update_User,
} = require("../../Controller/Admin__Controller_User");

Router.post("/login", CTL__Login_User);
Router.post("/signup", CTL__Create_User);
Router.put("/:id", JWT_Verify_Token, CTL__Update_User);

Router.post(
  "/get_playlist",
  JWT_Verify_Token,
  Controller_User.Get_Playlist_User
);
module.exports = Router;
