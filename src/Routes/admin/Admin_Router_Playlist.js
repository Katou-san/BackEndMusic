const { multer_Single } = require("../../Configs/Multer_Cus");
const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const {
  CTL__Get_Playlist,
  CTL__Update_Playlist,
  CTL__Delete_Playlist,
  CTL__Create_Playlist,
} = require("../../Controller/Admin__Controller_Playlist");

const uploadFile = multer_Single();

//TODO localhost:8080/api/admin/v1/playlist
Router.get("/playlist", CTL__Get_Playlist);
Router.get("/playlist/:id", CTL__Get_Playlist);
Router.post(
  "/playlist",
  JWT_Verify_Token,
  Validate_Role(["admin", "client"]),
  CTL__Create_Playlist
);
Router.put(
  "/playlist/:id",
  JWT_Verify_Token,
  Validate_Role(["admin", "client"]),
  CTL__Update_Playlist
);
Router.delete(
  "/playlist/:id",
  JWT_Verify_Token,
  Validate_Role(["admin", "client"]),
  CTL__Delete_Playlist
);

module.exports = Router;
