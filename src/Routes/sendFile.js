const express = require("express");
const Router = express.Router();
const path = require("path");
const multer = require("multer");
const SendFile = require("../Controller/SendFileController");

Router.get("/audio/:Id", SendFile.getAudio);
Router.get("/image/:Id", SendFile.getImage);
module.exports = Router;
