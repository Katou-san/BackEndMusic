const express = require("express");
const Router = express.Router();
const SongController = require("../Controller/SongController");
const path = require("path");
const multer = require("multer");

const storagePath = multer.diskStorage({
  destination: function (req, file, cb) {
    let filePath = file.mimetype.split("/")[0];
    if (filePath == "audio") {
      cb(null, "./src/Song_Audio");
    } else if (filePath === "image") {
      cb(null, "./src/Song_Image");
    }
  },
  filename: function (req, file, cb) {
    cb(
      null,
      req.body.User_Id +
        "_" +
        req.body.Song_Name +
        "_" +
        req.body.Post_Time +
        path.extname(file.originalname)
    );
  },
});
const uploadFile = multer({ storage: storagePath });

Router.get("/SendSong", SongController.SendSong);
Router.post(
  "/UploadSong",
  uploadFile.array("Files"),
  SongController.CreateSong
);
Router.get("/GetAllSong", SongController.GetListSong);

module.exports = Router;
