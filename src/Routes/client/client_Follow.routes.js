const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const {
  CTL__Get_Follower,
  CTL__Get_Following,
  CTL__Create_Follow,
  CTL__Delete_Follow,
} = require("../../Controller/Controller_Follow");

//TODO localhost:8080/api/admin/v1/Follow
Router.get("/Follower/:id", CTL__Get_Follower);
Router.get("/Following/:id", CTL__Get_Following);
Router.post(
  "/Follow",
  JWT_Verify_Token,
  Validate_Role(["client"]),
  CTL__Create_Follow
);

Router.delete(
  "/Follow/:id",
  JWT_Verify_Token,
  Validate_Role(["client"]),
  CTL__Delete_Follow
);

module.exports = Router;
