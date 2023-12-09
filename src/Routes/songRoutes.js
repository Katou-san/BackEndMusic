const express = require("express");
const Router = express.Router();
const SongController = require("../Controller/SongController");
const path = require("path");
const multer = require("multer");

const storagePath = multer.diskStorage({
  destination: function (req, file, cb) {
    let filePath = file.mimetype.split("/")[0];
    if (filePath == "audio") {
      cb(null, "./src/SongList");
    } else if (filePath === "image") {
      cb(null, "./src/ImgUpload");
    }
  },
  filename: function (req, file, cb) {
    cb(
      null,
      req.body.IdUser +
        "_" +
        req.body.NameSong +
        "_" +
        req.body.PostTime +
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
Router.get("/GetListSong", SongController.GetListSong);

module.exports = Router;
