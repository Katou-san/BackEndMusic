const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const {
  CTL__Get_Follow,
  CTL__Create_Follow,
  CTL__Delete_Follow,
  CTL__Get_Follow_Current,
} = require("../../Controller/Controller_Follow");

//TODO localhost:8080/api/admin/v1/follow
Router.get("/follow/:id", CTL__Get_Follow);
Router.get("/follows/:id", JWT_Verify_Token, CTL__Get_Follow_Current);
Router.post(
  "/follow",
  JWT_Verify_Token,
  Validate_Role(["client", "creator"]),
  CTL__Create_Follow
);

Router.delete(
  "/follow/:id",
  JWT_Verify_Token,
  Validate_Role(["client", "creator"]),
  CTL__Delete_Follow
);

module.exports = Router;
