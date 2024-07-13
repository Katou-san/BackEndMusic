const { Validate_Role } = require("../../Middleware/Role_Validate");
const { JWT_Verify_Token } = require("../../Middleware/JWT_ActionS");
const express = require("express");
const Router = express.Router();
const {
  CTL__Get_Like,
  CTL__Create_Like,
  CTL__Update_Like,
  CTL__Delete_Like,
} = require("../../Controller/Controller_Like");

//TODO localhost:8080/api/admin/v1/like
Router.get("/likes/:topic/:type", CTL__Get_Like);
Router.get(
  "/like/:topic/:type",
  JWT_Verify_Token,
  Validate_Role(["client"]),
  CTL__Get_Like
);
Router.post(
  "/like",
  JWT_Verify_Token,
  Validate_Role(["client"]),
  CTL__Create_Like
);
Router.put(
  "/like",
  JWT_Verify_Token,
  Validate_Role(["client"]),
  CTL__Update_Like
);

Router.delete(
  "/like/:topic/:type",
  JWT_Verify_Token,
  Validate_Role(["client"]),
  CTL__Delete_Like
);

module.exports = Router;
