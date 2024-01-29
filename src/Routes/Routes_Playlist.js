const express = require("express");
const Router = express.Router();
const Controller_Playlist = require("../Controller/Controller_Playlist");
const path = require("path");
const multer = require("multer");

const storagePath = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/Playlist_Image");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      req.body.User_Id +
        "_" +
        req.body.Playlist_Name +
        "_" +
        req.body.Post_Time +
        path.extname(file.originalname)
    );
  },
});
const uploadFile = multer({ storage: storagePath });

Router.post("/Create_playlist", Controller_Playlist.CreatePlaylist);
Router.put("/Update_playlist/:id", Controller_Playlist.UpdatePlaylist);
Router.delete("/Delete_playlist/:id", Controller_Playlist.DeletePlaylist);
module.exports = Router;
