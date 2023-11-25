const express = require("express");
const Router = express.Router();
const SongController = require("../Controller/SongController");

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "./src/SongList",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

Router.get("/SendSong", SongController.SendSong);
Router.post("/UploadSong", upload.single("Song"), SongController.CreateSong());

module.exports = Router;
