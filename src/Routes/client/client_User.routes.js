const { multer_Single } = require("../../Configs/Multer_Cus");
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
} = require("../../Controller/Controller_User");
const uploadFile = multer_Single();

//TODO localhost:8080/api/v1/user
Router.post("/user/login", CTL__Login_User);
Router.post("/user/signup", CTL__Create_User);
Router.post("/user/Oauth", JWT_Verify_Token, CTL__Oauth);

Router.get(
  "/user/:id",
  JWT_Verify_Token,
  Validate_Role(["client"]),
  CTL__Get_User
);

Router.put(
  "/user",
  JWT_Verify_Token,
  Validate_Role(["admin", "client"]),
  uploadFile.single("Avatar"),
  CTL__Update_User
);

Router.delete(
  "/user/:id",
  JWT_Verify_Token,
  Validate_Role(["admin"]),
  CTL__Delete_User
);

module.exports = Router;
