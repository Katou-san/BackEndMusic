const { JWT_Verify_Token } = require("../Middleware/JWT_ActionS");
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
        req.body.Playlist_Name.toLowerCase().replaceAll(" ", "%~%") +
        "_" +
        req.body.Post_Time +
        path.extname(file.originalname)
    );
  },
});
const uploadFile = multer({ storage: storagePath });

Router.post(
  "/create_playlist",
  JWT_Verify_Token,
  Controller_Playlist.Create_Playlist
);
Router.get("/find_playlist/:id", Controller_Playlist.Get_Playlist);
Router.put("/update_playlist/:id", Controller_Playlist.Update_Playlist);
Router.delete("/delete_playlist/:id", Controller_Playlist.Delete_Playlist);
module.exports = Router;
