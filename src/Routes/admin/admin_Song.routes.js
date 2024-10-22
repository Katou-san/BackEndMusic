const { multer_Single, multer_Array } = require("../../Configs/Multer_Cus");
const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const {
  CTL__Get_Song,
  CTL__Create_Song,
  CTL__Get_SongM,
  CTL__Delete_Song_Admin,
  CTL__Update_Song_Admin,
  CTL__Check_Song_Delete_Admin,
} = require("../../Controller/Controller_Song");

const uploadArray = multer_Array();

//TODO localhost:8080/api/admin/v1/song
Router.get("/song", CTL__Get_Song);
Router.get("/song/:id", CTL__Get_Song);

Router.get(
  "/songs/:type",
  JWT_Verify_Token,
  Validate_Role(["employess", "admin"]),
  CTL__Get_SongM
);
Router.get(
  "/songs-check/:id",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  CTL__Check_Song_Delete_Admin
);

Router.post(
  "/song",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  uploadArray.fields([{ name: "Song_Image" }, { name: "Song_Audio" }]),
  CTL__Create_Song
);

Router.put(
  "/song/:id",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  uploadArray.fields([{ name: "Song_Audio" }, { name: "Song_Image" }]),
  CTL__Update_Song_Admin
);

Router.delete(
  "/song/:id",
  JWT_Verify_Token,
  Validate_Role(["admin"]),
  CTL__Delete_Song_Admin
);

module.exports = Router;
