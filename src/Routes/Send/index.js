const express = require("express");
const Router = express.Router();
const Controller_Send = require("../../Controller/Controller_Send");

Router.get("/audio/:Id", Controller_Send.Send_Song_Audio);
Router.get("/image/:Id", Controller_Send.Send_Song_Img);
Router.get("/user/avatar/:Id", Controller_Send.Send_User_Avatar);
Router.get("/image_P/:Id", Controller_Send.Send_Playlist_Img);
Router.get("/thumbnail/:Id", Controller_Send.Send_Playlist_Thumbnail);
Router.get("/logo/:Id", Controller_Send.Send_Logo);

module.exports = Router;
