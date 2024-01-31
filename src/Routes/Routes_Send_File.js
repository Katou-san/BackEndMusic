const express = require("express");
const Router = express.Router();
const path = require("path");
const multer = require("multer");
const Controller_Send_File = require("../Controller/Controller_Send_File");

Router.get("/audio/:Id", Controller_Send_File.Send_Song_Audio);
Router.get("/image/:Id", Controller_Send_File.Send_Song_Img);
Router.get("/user/avatar/:Id", Controller_Send_File.Send_User_Avatar);
Router.get("/playlist/img/:Id", Controller_Send_File.Send_Playlist_Img);
Router.get(
  "/playlist/thumbnail/:Id",
  Controller_Send_File.Send_Playlist_Thumbnail
);
module.exports = Router;
