const express = require("express");
const Router = express.Router();
const SongController = require("../Controller/SongController");

Router.get("/SendSong", SongController.SendSong);
Router.post("/UploadSong", SongController.CreateSong);

module.exports = Router;
