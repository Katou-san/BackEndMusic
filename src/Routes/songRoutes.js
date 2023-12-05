const express = require("express");
const Router = express.Router();
const SongController = require("../Controller/SongController");
const path = require("path");
const multer = require("multer");

const temppath = (path) => {
  if (path === "audio") {
    return "./src/SongList";
  } else if (path === "image") {
    return "./src/ImgUpload";
  }
};

const storageSong = multer.diskStorage({
  destination: temppath("mp3"),
  filename: function (req, file, cb) {
    cb(
      null,
      file.originalname.split(".")[0] +
        "_" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

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
      file.originalname.split(".")[0] +
        "_" +
        Date.now() +
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

module.exports = Router;
