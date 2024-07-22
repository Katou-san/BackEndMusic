const { multer_Single, multer_Array } = require("../../Configs/Multer_Cus");
const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();

const {
  CTL__Get_User,
  CTL__Update_User,
  CTL__Delete_User,
  CTL__Create_User,
  CTL__Login_User,
  CTL__Oauth,
  CTL__Get_User__Client,
} = require("../../Controller/Controller_User");
const uploadArray = multer_Array();

//TODO localhost:8080/api/v1/user
Router.post("/user/login/:type", CTL__Login_User);
Router.post("/user/signup", CTL__Create_User);
Router.get("/user/Oauth", JWT_Verify_Token, CTL__Oauth);

Router.get("/user/:type/:id", JWT_Verify_Token, CTL__Get_User__Client);

Router.put(
  "/user",
  JWT_Verify_Token,
  Validate_Role(["client"]),
  uploadArray.fields([{ name: "Avatar" }]),
  CTL__Update_User
);

Router.delete(
  "/user/:id",
  JWT_Verify_Token,
  Validate_Role(["admin"]),
  CTL__Delete_User
);

module.exports = Router;
