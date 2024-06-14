const { multer_Single, multer_Array } = require("../../Configs/Multer_Cus");
const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const {
  CTL__Get_Song,
  CTL__Update_Song,
  CTL__Create_Song,
  CTL__Delete_Song,
} = require("../../Controller/Controller_Song");

const uploadAudio = multer_Single("./src/Assets/Song_Audio");
const uploadImg = multer_Single("./src/Assets/Song_Image");
const uploadArray = multer_Array();

//TODO localhost:8080/api/admin/v1/song
Router.get("/song", CTL__Get_Song);
Router.get("/song/:id", CTL__Get_Song);
Router.post(
  "/song",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess", "client"], true),
  uploadArray.fields([{ name: "Song_Image" }, { name: "Song_Audio" }]),
  CTL__Create_Song
);

Router.put(
  "/song/:id",
  JWT_Verify_Token,
  Validate_Role(["admin", "client"]),
  uploadArray.fields([{ name: "Song_Audio" }, { name: "Song_Image" }]),
  CTL__Update_Song
);

Router.delete(
  "/song/:id",
  JWT_Verify_Token,
  Validate_Role(["admin", "client"]),
  CTL__Delete_Song
);

module.exports = Router;
