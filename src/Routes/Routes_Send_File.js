const express = require("express");
const Router = express.Router();
const path = require("path");
const multer = require("multer");
const Controller_Send_File = require("../Controller/Controller_Send_File");

Router.get("/audio/:Id", Controller_Send_File.getAudio);
Router.get("/image/:Id", Controller_Send_File.getImage);
module.exports = Router;
