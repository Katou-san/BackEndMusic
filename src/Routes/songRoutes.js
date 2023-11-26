const express = require("express");
const Router = express.Router();
const SongController = require("../Controller/SongController");
const path = require("path");
const multer = require("multer");

const storageSong = multer.diskStorage({
  destination: "./src/SongList",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
})

const storageIMG = multer.diskStorage({
  destination: "./src/ImgUpload",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
})
const uploadSong = multer({ storage: storageSong });
const uploadIMG = multer({ storage: storageIMG})

Router.get("/SendSong", SongController.SendSong);
Router.post("/UploadSong", uploadIMG.array("Files"), SongController.CreateSong);

module.exports = Router;
