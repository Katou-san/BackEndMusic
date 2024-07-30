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
  CTL__Get_UserM,
  CTL__Update_User_Admin,
  CTL__Find_User,
} = require("../../Controller/Controller_User");
const uploadFile = multer_Single();

//TODO localhost:8080/api/admin/v1/user
Router.get(
  "/user",
  JWT_Verify_Token,
  Validate_Role(["employess", "admin"]),
  CTL__Get_User
);

Router.get(
  "/users/:type",
  JWT_Verify_Token,
  Validate_Role(["admin", "employess"]),
  CTL__Get_UserM
);

Router.get(
  "/user/:type/:id",
  JWT_Verify_Token,
  Validate_Role(["employess", "admin"]),
  CTL__Get_User
);

Router.get(
  "/find-user/:name",
  JWT_Verify_Token,
  Validate_Role(["employess", "admin"]),
  CTL__Find_User
);

Router.get("/user/Oauth", JWT_Verify_Token, CTL__Oauth);
// Router.post("/user/login", CTL__Login_User);
Router.post("/user/login/:type", CTL__Login_User);
Router.post(
  "/user/signup",
  JWT_Verify_Token,
  Validate_Role(["admin"]),
  CTL__Create_User
);

Router.put(
  "/user/:id",
  JWT_Verify_Token,
  Validate_Role(["admin"]),
  CTL__Update_User_Admin
);

Router.delete(
  "/user/:id",
  JWT_Verify_Token,
  Validate_Role(["admin"]),
  CTL__Delete_User
);

module.exports = Router;
